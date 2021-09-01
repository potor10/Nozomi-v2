// Dependencies 
const sqlite3 = require('better-sqlite3')
const ApiException = require('./api_exception')
const path = require('path')
const fs = require('fs')


// Manages Account Portion of App Master Database
module.exports = class CollectionDatabase {
  constructor(server_id=0, master_db, account_db) {
    const database_path = path.join(__dirname, '..', 'database', `master_${server_id}`)

    this._db = new sqlite3(database_path)
    this._master_db = master_db
    this._account_db = account_db

    this._STAT_NAMES = ['hp', 'atk', 'magic_str', 'def', 'magic_def', 
      'physical_critical', 'magic_critical', 'wave_hp_recovery', 'wave_energy_recovery',
      'dodge', 'physical_penetrate', 'magic_penetrate', 'life_steal', 'hp_recovery_rate', 
      'energy_reduce_rate', 'accuracy']

    // obtained from pricalc
    this._NUMBER_TO_STAT = {
      1: "hp",
      2: "atk",
      3: "def",
      4: "magic_str",
      5: "magic_def",
      6: "physical_critical",
      7: "magic_critical",
      8: "dodge",
      9: "life_steal",
      10: "wave_hp_recovery", 
      11: "wave_energy_recovery",
      14: "don't know",
      15: "hp_recovery_rate"
    }

    this._NUMBER_TO_EQUIP = {
      1: "equip1", 
      2: "equip2", 
      3: "equip3", 
      4: "equip4", 
      5: "equip5", 
      6: "equip6"
    }

    this._MANA_TO_XP = 0.375

    this._NUMBER_TO_SKILL = { 
      101: 'ub_level', 
      201: 's1_level', 
      202: 's2_level', 
      301: 'ex_level'
    }
  }

  init() {
    const stmt_str = "CREATE TABLE IF NOT EXISTS collection ( " +
      "discord_id TEXT, unit_id INTEGER, base_id INTEGER, " + 
      "rarity INTEGER, level INTEGER DEFAULT 1, bond INTEGER DEFAULT 1, " + 
      "ub_level INTEGER DEFAULT 1, s1_level INTEGER DEFAULT 0, " +
      "s2_level INTEGER DEFAULT 0, ex_level INTEGER DEFAULT 0, " + 
      "promotion_level INTEGER DEFAULT 1, " +
      "equip1 INTEGER DEFAULT 0, equip2 INTEGER DEFAULT 0, " +
      "equip3 INTEGER DEFAULT 0, equip4 INTEGER DEFAULT 0, " +
      "equip5 INTEGER DEFAULT 0, equip6 INTEGER DEFAULT 0, " +
      "hp INTEGER DEFAULT 0, atk INTEGER DEFAULT 0, magic_str INTEGER DEFAULT 0, " +
      "def INTEGER DEFAULT 0, magic_def INTEGER DEFAULT 0, " + 
      "physical_critical INTEGER DEFAULT 0, magic_critical INTEGER DEFAULT 0, " +
      "wave_hp_recovery INTEGER DEFAULT 0, wave_energy_recovery INTEGER DEFAULT 0, " +
      "dodge INTEGER DEFAULT 0, physical_penetrate INTEGER DEFAULT 0, " +
      "magic_penetrate INTEGER DEFAULT 0, life_steal INTEGER DEFAULT 0, " +
      "hp_recovery_rate INTEGER DEFAULT 0, energy_reduce_rate INTEGER DEFAULT 0, " +
      "accuracy INTEGER DEFAULT 0, total_power INTEGER DEFAULT 0)"

    const stmt = this._db.prepare(stmt_str)
    stmt.run()
  }

  addUnit(discord_id, unit_id) {
    const rarity = this._master_db.getUnitData(unit_id).rarity
    const base_id = parseInt(unit_id.toString().substring(0, 4))

    const stmt_str = "INSERT INTO collection (discord_id, unit_id, base_id, rarity) " + 
      "VALUES(?, ?, ?, ?)"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(discord_id, unit_id, base_id, rarity)

    if (query.changes === 1) {
      this.updateStats(discord_id, unit_id)
      return true
    } else {
      throw new ApiException(500, 'ERROR: Unit Was Not Added')
    }
  }

  getUnit(discord_id, unit_id) {
    const stmt_str = "SELECT * FROM collection WHERE discord_id = ? AND unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(discord_id, unit_id)
    if (query === undefined) throw new ApiException(500, "ERROR: Unit Was Not Able To be Found")
    return query
  }

  unitExists(discord_id, unit_id) {
    const stmt_str = "SELECT * FROM collection WHERE discord_id = ? AND unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all(discord_id, unit_id)
    return query.length > 0
  }

  equipCost(discord_id, unit_id, equip_idx) {
    const unit = this.getUnit(discord_id, unit_id)
    const unit_promotion = this._master_db.getUnitPromotion(unit_id, unit.promotion_level)
    const equip_id = unit_promotion[`equip_slot_${equip_idx}`]
    if (equip_id === 999999) {
      throw new ApiException(400, 'ERROR: Cannot Equip This Equipment')
    } else if (equip_id === undefined) {
      throw new ApiException(400, 'ERROR: Equipment Does Not Exist')
    }
    const equip_promotion = this._master_db.getEquipmentData(equip_id).promotion_level
    return this._master_db.getEquipmentEnhanceData(equip_promotion)
  }

  addEquipment(discord_id, unit_id, equip_idx) {
    const equip_cost = this.equipCost(discord_id, unit_id, equip_idx) * -1
    if (this.getUnit(discord_id, unit_id)[this._NUMBER_TO_EQUIP[equip_idx]] === 1) {
      throw new ApiException(400, 'ERROR: Already Equipped!')
    }

    const user = this._account_db.getUser(discord_id)
    if (user.jewels >= equip_cost) {
      this._account_db.addJewels(discord_id, equip_cost * -1)
    } else { 
      throw new ApiException(400, 'Not Enough Gems!')
    }
    
    const stmt_str = `UPDATE collection SET ${this._NUMBER_TO_EQUIP[equip_idx]} = ? WHERE discord_id = ? AND unit_id = ?`
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(1, discord_id, unit_id)

    if (query.changes === 1) {
      this.updateStats(discord_id, unit_id)
      return true
    } else {
      throw new ApiException(500, 'ERROR: Equipment Was Not Updated')
    }
  }

  rankUp(discord_id, unit_id) {
    const unit = this.getUnit(discord_id, unit_id)
    let equipped_all = true
    for (let i = 1; i <= 6; i++) {
      if (unit[this._NUMBER_TO_EQUIP[i]] !== 1) {
        equipped_all = false
        break
      }
    }

    if (!equipped_all) {
      throw new ApiException(400, 'ERROR: You Must Equip All Before Ranking Up')
    } else {
      const unit = this.getUnit(discord_id, unit_id)
      const new_promotion_level = unit.promotion_level + 1
      const stmt_str = "UPDATE collection SET promotion_level = ?, " + 
      "equip1 = 0, equip2 = 0, equip3 = 0, equip4 = 0, equip5 = 0, equip6 = 0 " +
      "WHERE discord_id = ? AND unit_id = ?"
      const stmt = this._db.prepare(stmt_str)
      const query = stmt.run(new_promotion_level, discord_id, unit_id)

      if (query.changes === 1) {
        const skill_unlock = this._master_db.getSkillUnlockDataFromPromotion(new_promotion_level)
        if (skill_unlock !== undefined) {
          this.levelUpSkill(discord_id, unit_id, skill_unlock.unlock_skill)
        }
        this.updateStats(discord_id, unit_id)
        return true
      } else {
        throw new ApiException(500, 'ERROR: Equipment Was Not Updated')
      }
    }
  }

  isMaxRarity(discord_id, unit_id) {
    const unit = this.getUnit(discord_id, unit_id)
    try {
      this._master_db.getUnitRarity(unit.unit_id, unit.rarity+1)
      return false
    } catch (e) {
      return true
    }
  }

  increaseRarityCost(discord_id, unit_id) {
    const unit = this.getUnit(discord_id, unit_id)
    const base_rarity = this._master_db.getUnitData(unit.unit_id).rarity
    let total_exchanged = 0
    for (let i = base_rarity + 1; i < unit.rarity + 1; i++) {
      total_exchanged += this._master_db.getUnitRarity(unit.unit_id, i).consume_num
    }

    const higher_rarity = this._master_db.getUnitRarity(unit.unit_id, unit.rarity + 1)
    const consume_num = higher_rarity.consume_num
    const consume_mana = higher_rarity.consume_gold

    const total_needed = total_exchanged + consume_num

    const amulet_exchange = this._master_db.getShopStaticPriceGroup(total_exchanged, total_needed)

    if (!(amulet_exchange.length > 0)) {
      throw new ApiException(500, "no amulet exchange")
    }
    
    let amulet_cost = 0
    amulet_exchange.forEach(exchange => {
      let lower = total_exchanged
      if (total_exchanged < exchange.buy_count_from) {
        lower = exchange.buy_count_from - 1
      }

      let higher = (exchange.buy_count_to == -1) ? total_needed : exchange.buy_count_to
      if (total_needed < exchange.buy_count_to) {
        higher = total_needed
      }

      amulet_cost += (higher - lower) * exchange.count
    })

    return { amulet_cost: amulet_cost, mana_cost: consume_mana }
  }

  increaseRarity(discord_id, unit_id) {
    const unit = this.getUnit(discord_id, unit_id)

    if (this.isMaxRarity(discord_id, unit_id)) {
      throw new ApiException(400, 'Character Is Already Max Rarity')
    }

    const rarity_cost = this.increaseRarityCost(discord_id, unit_id) 

    const user = this._account_db.getUser(discord_id)
    if (user.amulets >= rarity_cost.amulet_cost) {
      this._account_db.addAmulets(discord_id, rarity_cost.amulet_cost * -1)
    } else { 
      throw new ApiException(400, 'Not Enough Amulets!')
    }

    if (user.mana >= rarity_cost.mana_cost) {
      this._account_db.addMana(discord_id, rarity_cost.mana_cost * -1)
    } else { 
      throw new ApiException(400, 'Not Enough Mana!')
    }

    const stmt_str = "UPDATE collection SET rarity = ? WHERE discord_id = ? AND unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(unit.rarity+1, discord_id, unit_id)

    if (query.changes === 1) {
      this.updateStats(discord_id, unit_id)
      return true
    } else {
      throw new ApiException(500, 'ERROR: Rarity Was Not Updated')
    }
  }

  levelUpCost(discord_id, unit_id, max=false) {
    const unit = this.getUnit(discord_id, unit_id)
    const user = this._account_db.getUser(discord_id)

    const current_level = this._master_db.getExperienceUnit(unit.level)
    const new_level = (max) ? 
      this._master_db.getExperienceUnit(user.level) :
      this._master_db.getExperienceUnit(unit.level+1)

    return Math.round((new_level.total_exp - current_level.total_exp) / this._MANA_TO_XP)
  }

  levelUpUnit(discord_id, unit_id, max=false) {
    const unit = this.getUnit(discord_id, unit_id)
    const user = this._account_db.getUser(discord_id)

    const current_level = this._master_db.getExperienceUnit(unit.level)
    const new_level = (max) ? 
      this._master_db.getExperienceUnit(user.level) :
      this._master_db.getExperienceUnit(unit.level+1)

    if (new_level.unit_level > user.level) {
      throw new ApiException(400, 'Cannot Level Up Unit Under Player Level')
    }

    if (new_level.unit_level >= new_level.max_level) {
      throw new ApiException(400, 'Cannot Level Up Unit Any Further')
    }

    const mana_cost = Math.round((new_level.total_exp - current_level.total_exp) / this._MANA_TO_XP)

    if (user.mana >= mana_cost) {
      this._account_db.addMana(discord_id, mana_cost * -1)
    } else { 
      throw new ApiException(400, 'Not Enough Mana!')
    }

    const stmt_str = "UPDATE collection SET level = ? WHERE discord_id = ? AND unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(new_level.unit_level, discord_id, unit_id)

    if (query.changes === 1) {
      this.updateStats(discord_id, unit_id)
      return true
    } else {
      throw new ApiException(500, 'ERROR: Unit Level Was Not Updated')
    }
  }

  levelUpSkillCost(discord_id, unit_id, skill_idx, max=false) {
    const unit = this.getUnit(discord_id, unit_id)
    const current_skill = this._NUMBER_TO_SKILL[skill_idx]

    const current_level = unit[current_skill]
    if (current_level === undefined) {
      throw new ApiException(400, 'Cannot Find Specified Skill')
    }
    let new_level = current_level + 1

    let mana_cost = 0
    if (max) {
      while (new_level <= unit.level) {
        mana_cost += this._master_db.getSkillCost(new_level).cost
        new_level += 1
      }
    } else {
      if (new_level <= unit.level) {
        mana_cost += this._master_db.getSkillCost(new_level).cost
      } else {
        throw new ApiException(400, 'Cannot Level Up Past Unit Level')
      }
    }

    return mana_cost
  }

  levelUpSkill(discord_id, unit_id, skill_idx, max=false) {
    const req_promotion_level = this._master_db.getSkillUnlockData(skill_idx).promotion_level 

    const user = this._account_db.getUser(discord_id)
    const unit = this.getUnit(discord_id, unit_id)

    if (req_promotion_level > unit.promotion_level) {
      throw new ApiException(400, 'You Do Not Have Access To This Skill')
    }

    const mana_cost = this.levelUpSkillCost(discord_id, unit_id, skill_idx, max)
    console.log(mana_cost)
    
    const new_level = (max) ? user.level : unit[this._NUMBER_TO_SKILL[skill_idx]] + 1

    if (user.mana >= mana_cost) {
      this._account_db.addMana(discord_id, mana_cost * -1)
    } else { 
      throw new ApiException(400, 'Not Enough Mana!')
    }

    const stmt_str = `UPDATE collection SET ${this._NUMBER_TO_SKILL[skill_idx]} = ? WHERE discord_id = ? AND unit_id = ?`
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(new_level, discord_id, unit_id)

    if (query.changes === 1) {
      this.updateStats(discord_id, unit_id)
      return true
    } else {
      throw new ApiException(500, 'ERROR: Skill Level Was Not Updated')
    }    
  }

  levelUpBondCost(discord_id, unit_id) {
    const unit = this.getUnit(discord_id, unit_id)
    const new_bond = this._master_db.getLoveChara(unit.bond + 1)
    const old_bond = this._master_db.getLoveChara(unit.bond)
    if(new_bond.unlocked_class !== 1) {
      throw new ApiException(400, 'You Have Reached Max Bond')
    }

    if(new_bond.rarity > unit.rarity) {
      throw new ApiException(400, 'Your Rarity Is Not Enough')
    }
    
    const love_needed = new_bond.total_love - old_bond.total_love
    return love_needed
  }

  levelUpBond(discord_id, unit_id) {
    const unit = this.getUnit(discord_id, unit_id)
    const user = this._account_db.getUser(discord_id)
    const love_needed = this.levelUpBondCost(discord_id, unit_id)

    if (user.jewels >= love_needed) {
      this._account_db.addJewels(discord_id, love_needed * -1)
    } else { 
      throw new ApiException(400, 'Not Enough Gems!')
    }

    const stmt_str = `UPDATE collection SET bond = ? WHERE discord_id = ? AND unit_id = ?`
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(unit.bond + 1, discord_id, unit_id)

    if (query.changes === 1) {
      this.updateStats(discord_id, unit_id)
      return true
    } else {
      throw new ApiException(500, 'ERROR: Bond Level Was Not Updated')
    }    
  }

  updateStats(discord_id, unit_id) {
    const stats = this.calculateStats(discord_id, unit_id)
    let stmt_str = "UPDATE collection SET total_power = ?, "
    this._STAT_NAMES.forEach(stat => {
      stmt_str += `${stat} = ?,`
    })
    stmt_str = stmt_str.slice(0, -1)
    stmt_str += " WHERE discord_id = ? AND unit_id = ?"

    const stmt = this._db.prepare(stmt_str)

    let query_param = [stats.power]
    this._STAT_NAMES.forEach(stat => {
      query_param.push(stats[stat])
    })
    query_param.push(discord_id)
    query_param.push(unit_id)
    const query = stmt.run(...query_param)
    
    if (query.changes === 1) {
      return true
    } else {
      throw new ApiException(500, 'ERROR: Power Was Not Updated')
    }
  }

  getUnitFromBase(discord_id, base_id) {
    const stmt_str = "SELECT * FROM collection WHERE discord_id = ? AND base_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(discord_id, base_id)
    if (query === undefined) throw new ApiException(500, "ERROR: Unit Was Not Able To be Found")
    return query
  }

  calculateStats(discord_id, unit_id) {
    let power = 0

    let unit = this.getUnit(discord_id, unit_id)

    let stats = this.getBaseStats(unit)
    stats = this.getPromotionLevelStats(unit, stats)
    stats = this.getEquipmentStats(unit, stats)
    stats = this.getBondStats(unit, stats, discord_id)

    const weights = this._master_db.getUnitStatusCoefficient()

    this._STAT_NAMES.forEach(stat => {
      power += stats[stat] * weights[stat + "_coefficient"]
    })

    power = Math.round(power)

    let sum_skills = unit.ub_level + unit.s1_level + unit.s2_level
		power += weights.skill_lv_coefficient * sum_skills;

    if (unit.rarity >= 5) {
			power += 150
      power += weights.exskill_evolution_coefficient * unit.ex_level
		} else if (unit.rarity >= 6) {
			power += 2000;
			power += 5 * unit.ub_level;
      power += weights.exskill_evolution_coefficient * unit.ex_level;
		} else {
      power += weights.skill_lv_coefficient * unit.ex_level;
    }
    
    stats = this.getExSkillStats(unit, stats)
    stats.power = power

    // console.log(stats)
    return stats
  }

  getBaseStats(unit) {
    let stats = {}
    const effectiveLevel = unit.level + unit.promotion_level
    const unit_rarity = this._master_db.getUnitRarity(unit.unit_id, unit.rarity)

    this._STAT_NAMES.forEach(stat => {
      stats[stat] = Math.round(unit_rarity[stat] + unit_rarity[stat + "_growth"] * effectiveLevel)
    })

    return stats
  }

  getPromotionLevelStats(unit, stats) {
    if (unit.promotion_level > 1) {
      const unit_promotion_status = this._master_db.getUnitPromotionStatus(unit.unit_id, unit.promotion_level)
      this._STAT_NAMES.forEach(stat => {
        stats[stat] += unit_promotion_status[stat]
      })
    }
  
    return stats
  }

  getEquipmentStats(unit, stats) {
    for (let i = 1; i <= 6; i++) {
      let equipped = unit[this._NUMBER_TO_EQUIP[i]]
      const unit_promotion = this._master_db.getUnitPromotion(unit.unit_id, unit.promotion_level)
      if (equipped === 1 && unit_promotion["equip_slot_" + i] !== 999999) {
        let equipment_data = this._master_db.getEquipmentData(unit_promotion["equip_slot_" + i])
        this._STAT_NAMES.forEach(stat => {
          stats[stat] += Math.ceil(equipment_data[stat])
        })

        // Equipping an item is an automatic max refine in this bot
        let refine_data = this._master_db.getEquipmentEnhanceRate(unit_promotion["equip_slot_" + i])

        this._STAT_NAMES.forEach(stat => {
          stats[stat] += Math.ceil(refine_data[stat] * refine_data.max_refine)
        })
      }
    }
    return stats
  }

  getBondStats(unit, stats, discord_id) {
    const bond_stories = this._master_db.getBondStory(unit.base_id)

    const applicable_stories = bond_stories.filter(story => {
      if (story.story_group_id !== unit.base_id) {
        // check applicable other units
        try {
          const other_unit = this.getUnitFromBase(discord_id, story.story_group_id)
          return story.love_level <= other_unit.bond
        } catch (e) {
          // unit does not exist
          return false
        }
      }
      return story.love_level <= unit.bond
    })

    applicable_stories.forEach(story => {
      for (let i = 1; i <= 5; i++) {
        let stat = this._NUMBER_TO_STAT[story[`status_type_${i}`]]
        if (stat !== undefined) {
          stats[stat] += story[`status_rate_${i}`]
        }
      }
    })
  
    return stats
  }

  getExSkillStats(unit, stats) {
    if (unit.promotion_level >= 7) {
      const unit_skill_data = this._master_db.getUnitSkillData(unit.unit_id)
      let ex_skill = unit_skill_data.ex_skill_1
      if (unit.rarity >= 5) {
        ex_skill = unit_skill_data.ex_skill_evolution_1
      }

      const skill_actions = this._master_db.getSkillAction(ex_skill)
      skill_actions.forEach(action => {
        if (action.action_type === 90) {
          let stat = this._NUMBER_TO_STAT[action.action_detail_1];
          stats[stat] += action.action_value_2 + action.action_value_3 * unit.ex_level;
        }
      })
      
    }
    return stats
  }

  reset() {
    const stmt = this._db.prepare('DROP TABLE collection')
    stmt.run()
    this.init()
  }

  close() {
    this._db.close()
  }
}
