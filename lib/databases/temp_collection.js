this.updateStats(discord_id, unit_id)

getAllUnits(discord_id, sort_id=0, search_term='') {
  const wildcard_search = `%${search_term}%`
  let sort_type = 'total_power DESC'

  switch (sort_id) {
    case 1:
      sort_type = 'name ASC'
      break
    case 2:
      sort_type = 'rarity DESC'
      break
    default:
      sort_type = 'total_power DESC'
      break
  }

  const stmt_str = `SELECT * FROM collection WHERE name LIKE ? AND discord_id = ? ORDER BY ${sort_type}`
  const stmt = this._db.prepare(stmt_str)
  const query = stmt.all(wildcard_search, discord_id)
  if (query === undefined) throw new ApiException(500, "ERROR: Units Were Not Able To be Found")
  return query
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

  equipEquipment(discord_id, unit_id, equip_idx) {
    const equip_cost = this.equipCost(discord_id, unit_id, equip_idx)
    if (this.getUnit(discord_id, unit_id)[constants.NUMBER_TO_EQUIP[equip_idx]] === 1) {
      throw new ApiException(400, 'The Equipment Is Already Equipped!')
    }

    const user = this._account_db.getUser(discord_id)
    if (user.jewels >= equip_cost) {
      this._account_db.addJewels(discord_id, equip_cost * -1)
    } else { 
      throw new ApiException(400, 'You do not have enough jewels')
    }
    
    const stmt_str = `UPDATE collection SET ${constants.NUMBER_TO_EQUIP[equip_idx]} = ? WHERE discord_id = ? AND unit_id = ?`
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
      if (unit[constants.NUMBER_TO_EQUIP[i]] !== 1) {
        equipped_all = false
        break
      }
    }

    if (!equipped_all) {
      throw new ApiException(400, 'ERROR: You Must Equip All Before Ranking Up')
    } else {
      const unit = this.getUnit(discord_id, unit_id)
      const new_promotion_level = unit.promotion_level + 1
      let stmt_str = "UPDATE collection SET promotion_level = ?,"
      for(const idx in constants.NUMBER_TO_EQUIP) {
        stmt_str += `${constants.NUMBER_TO_EQUIP[idx]} = 0,`
      }
      stmt_str = stmt_str.slice(0, -1)
      stmt_str += " WHERE discord_id = ? AND unit_id = ?"
      const stmt = this._db.prepare(stmt_str)
      const query = stmt.run(new_promotion_level, discord_id, unit_id)

      if (query.changes === 1) {
        const skill_unlock = this._master_db.getSkillUnlockDataFromPromotion(new_promotion_level)
        if (skill_unlock !== undefined) {
          this.levelUpSkill(discord_id, unit_id, constants.NUMBER_TO_SKILL[skill_unlock.unlock_skill])
        }
        this.updateStats(discord_id, unit_id)
        return true
      } else {
        throw new ApiException(500, 'ERROR: Equipment Was Not Updated')
      }
    }
  }

  isMaxAscension(discord_id, unit_id) {
    const unit = this.getUnit(discord_id, unit_id)
    try {
      this._master_db.getUnitRarity(unit.unit_id, unit.rarity+1)
      return false
    } catch (e) {
      return true
    }
  }

  ascensionCost(discord_id, unit_id) {
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

  ascendUnit(discord_id, unit_id) {
    const unit = this.getUnit(discord_id, unit_id)

    if (this.isMaxAscension(discord_id, unit_id)) {
      throw new ApiException(400, 'Character Is Already Max Rarity')
    }

    const rarity_cost = this.ascensionCost(discord_id, unit_id) 

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

    return Math.round((new_level.total_exp - current_level.total_exp) / constants.MANA_TO_XP)
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

    const mana_cost = Math.round((new_level.total_exp - current_level.total_exp) / constants.MANA_TO_XP)

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

  levelUpSkillCost(discord_id, unit_id, skill_name, max=false) {
    const unit = this.getUnit(discord_id, unit_id)
    console.log(skill_name)
    const current_level = unit[skill_name]
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

  levelUpSkill(discord_id, unit_id, skill_name, max=false) {
    const skill_idx = constants.SKILL_TO_NUMBER[skill_name]
    if (skill_idx === undefined ) {
      throw new ApiException(400, 'Invalid Skill')
    } 

    const req_promotion_level = this._master_db.getSkillUnlockData(skill_idx).promotion_level 

    const user = this._account_db.getUser(discord_id)
    const unit = this.getUnit(discord_id, unit_id)

    if (req_promotion_level > unit.promotion_level) {
      throw new ApiException(400, 'You Do Not Have Access To This Skill')
    }

    const mana_cost = this.levelUpSkillCost(discord_id, unit_id, skill_name, max)
    console.log(mana_cost)
    
    const new_level = (max) ? unit.level : unit[skill_name] + 1

    if (user.mana >= mana_cost) {
      this._account_db.addMana(discord_id, mana_cost * -1)
    } else { 
      throw new ApiException(400, 'Not Enough Mana!')
    }

    const stmt_str = `UPDATE collection SET ${skill_name} = ? WHERE discord_id = ? AND unit_id = ?`
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
    const old_power = this.getUnit(discord_id, unit_id).total_power

    const stats = this.calculateStats(discord_id, unit_id)
    let stmt_str = "UPDATE collection SET total_power = ?, "
    constants.STAT_NAMES.forEach(stat => {
      stmt_str += `${stat} = ?,`
    })
    stmt_str = stmt_str.slice(0, -1)
    stmt_str += " WHERE discord_id = ? AND unit_id = ?"

    const stmt = this._db.prepare(stmt_str)

    let query_param = []
    constants.STAT_NAMES.forEach(stat => {
      query_param.push(stats[stat])
    })
    const query = stmt.run(stats.power, ...query_param, discord_id, unit_id)
    
    if (query.changes === 1) {
      const delta_power = stats.power - old_power
      this._account_db.addPower(discord_id, delta_power)
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

    constants.STAT_NAMES.forEach(stat => {
      power += stats[stat] * weights[stat + "_coefficient"]
    })

    power = Math.round(power)

    let sum_skills = unit[constants.SKILL_NAMES[0]] + 
      unit[constants.SKILL_NAMES[1]] + unit[constants.SKILL_NAMES[2]]
		power += weights.skill_lv_coefficient * sum_skills;

    if (unit.rarity >= 5) {
			power += 150
      power += weights.exskill_evolution_coefficient * unit[constants.SKILL_NAMES[3]]
		} else if (unit.rarity >= 6) {
			power += 2000;
			power += 5 * unit[constants.SKILL_NAMES[0]]
      power += weights.exskill_evolution_coefficient * unit[constants.SKILL_NAMES[3]]
		} else {
      power += weights.skill_lv_coefficient * unit[constants.SKILL_NAMES[3]]
    }
    
    stats = this.getExSkillStats(unit, stats)
    stats.power = power

    return stats
  }

  getBaseStats(unit) {
    let stats = {}
    const effectiveLevel = unit.level + unit.promotion_level
    const unit_rarity = this._master_db.getUnitRarity(unit.unit_id, unit.rarity)

    constants.STAT_NAMES.forEach(stat => {
      stats[stat] = Math.round(unit_rarity[stat] + unit_rarity[stat + "_growth"] * effectiveLevel)
    })

    return stats
  }

  getPromotionLevelStats(unit, stats) {
    if (unit.promotion_level > 1) {
      const unit_promotion_status = this._master_db.getUnitPromotionStatus(unit.unit_id, unit.promotion_level)
      constants.STAT_NAMES.forEach(stat => {
        stats[stat] += unit_promotion_status[stat]
      })
    }
  
    return stats
  }

  getEquipmentStats(unit, stats) {
    for (let i = 1; i <= 6; i++) {
      let equipped = unit[constants.NUMBER_TO_EQUIP[i]]
      const unit_promotion = this._master_db.getUnitPromotion(unit.unit_id, unit.promotion_level)
      if (equipped === 1 && unit_promotion["equip_slot_" + i] !== 999999) {
        let equipment_data = this._master_db.getEquipmentData(unit_promotion["equip_slot_" + i])
        constants.STAT_NAMES.forEach(stat => {
          stats[stat] += Math.ceil(equipment_data[stat])
        })

        // Equipping an item is an automatic max refine in this bot
        let refine_data = this._master_db.getEquipmentEnhanceRate(unit_promotion["equip_slot_" + i])

        constants.STAT_NAMES.forEach(stat => {
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
        let stat = constants.NUMBER_TO_STAT[story[`status_type_${i}`]]
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
          let stat = constants.NUMBER_TO_STAT[action.action_detail_1];
          stats[stat] += action.action_value_2 + action.action_value_3 * unit.ex_level;
        }
      })
      
    }
    return stats
  }

  generateSkillDescription(actions, skill_level, unit) {
    let description = []
    actions.forEach(action => {
      if (action.description.trim() !== '') {
        let skill_power = 0

        let action_stat = 'atk'
        if (action.action_detail_1 === 2) action_stat = "magic_str";

        switch (action.action_type) {
          // Standard Damage
          case 1:
          // Misato HP Regen
          case 48:
            skill_power = Math.round(
              action.action_value_1 + 
              action.action_value_2 * skill_level + 
              action.action_value_3 * unit[action_stat])
            break
          // Healing
          case 4:
            skill_power = Math.round(
              (action.action_value_2 + 
              action.action_value_3 * skill_level + 
              action.action_value_4 * unit[action_stat]) * 
              (1 + unit.hp_recovery_rate / 100))
            break
          // Barrier
          case 6:
          // Poison
          case 9:
          // TP
          case 16:
          // Kaori Boost
          case 34:
          // Mitsuki Debuff
          case 38:
            skill_power = Math.round(
              action.action_value_1 + 
              action.action_value_2 * skill_level)
            break
          // Buff
          case 10:
            skill_power = Math.ceil(
              action.action_value_2 + 
              action.action_value_3 * skill_level)
            break
          // Hp Activation Threshold
          case 17:
            skill_power = action.action_value_3
            break
          // Akino Regen Magic Circle
          case 37:
            const unit_data = this._master_db.getUnitData(unit.unit_id)
            action_stat = "atk"
            if (unit_data.atk_type === 2) action_stat = "magic_str"
            skill_power = Math.round(
              action.action_value_1 + 
              action.action_value_2 * skill_level + 
              action.action_value_3 * unit[action_stat])
            break
          // Ziz? Percent Hp Damage
          case 46:
            skill_power = action.action_value_1
            break
          // Ziz? /Alma? random area damage
          case 47:
            action_stat = "atk"
            if (action.action_detail_1 === 2) action_stat = "magic_str"
            skill_power = Math.round(
              action.action_value_1 + 
              action.action_value_2 * skill_level + 
              action.action_value_3 * unit[action_stat])
            break
          // Ex boost
          case 90:
            skill_power = Math.round(
              action.action_value_2 + 
              action.action_value_3 * skill_level)
            break
        }

        description.push(action.description.replace(/\{0\}/g, skill_power))
      }
    })

    return description
  }

  getAllSkillEffects(discord_id, unit_id) {
    // Get the unit
    const unit = this.getUnit(discord_id, unit_id)
    // Get the skills of unit
    const skill_ids = this._master_db.getUnitSkills(unit_id)

    let unit_skills = {}

    constants.SKILL_NAMES.forEach(skill_name => {
      const skill = this._master_db.getActionsFromSkill(skill_ids[skill_name])
      const actions = skill.actions
      const skill_level = unit[skill_name]
      const description = this.generateSkillDescription(actions, skill_level, unit)

      unit_skills[skill_name] = {
        skill_data: skill.skill_data,
        actions: description
      }
    })
    return unit_skills
  }

  getSkillEffect(discord_id, unit_id, skill_name) {
    // Get the unit
    const unit = this.getUnit(discord_id, unit_id)

    // Get unit skills
    const skill_ids = this._master_db.getUnitSkills(unit_id)

    const skill = this._master_db.getActionsFromSkill(skill_ids[skill_name])
    const actions = skill.actions
    const skill_level = unit[skill_name]
    const description = this.generateSkillDescription(actions, skill_level, unit)

    const unit_skill = {
      skill_data: skill.skill_data,
      actions: description
    }

    return unit_skill
  }