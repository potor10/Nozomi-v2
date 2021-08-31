// Dependencies 
const sqlite3 = require('better-sqlite3')
const MasterDatabase = require('./master_database')
const path = require('path')
const fs = require('fs')

// Manages Account Portion of App Master Database
module.exports = class CollectionDatabase {
  constructor() {
    const database_path = path.join(__dirname, '..', 'database', 'master')

    this._db = new sqlite3(database_path)
    this._master_db = new MasterDatabase()
    this._STAT_NAMES = ['atk', 'magic_str', 'def', 'magic_def', 
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

    this.init()
  }

  init() {
    const stmt_str = "CREATE TABLE IF NOT EXISTS collection ( " +
      "discord_id TEXT, unit_id INTEGER, base_id INTEGER " + 
      "rarity INTEGER, level INTEGER DEFAULT 1, bond INTEGER DEFAULT 1, " + 
      "ub_level INTEGER DEFAULT 1, s1_level INTEGER DEFAULT 0, " +
      "s2_level INTEGER DEFAULT 0, ex_level INTEGER DEFAULT 0, " + 
      "promotion_level INTEGER DEFAULT 1, " +
      "equip1 INTEGER DEFAULT 0, equip2 INTEGER DEFAULT 0, " +
      "equip3 INTEGER DEFAULT 0, equip4 INTEGER DEFAULT 0, " +
      "equip5 INTEGER DEFAULT 0, equip6 INTEGER DEFAULT 0, " +
      "total_power INTEGER DEFAULT 0)"

    const stmt = this._db.prepare(stmt_str)
    stmt.run()
  }

  addUnit(discord_id, unit_id) {
    const rarity = this._master_db.getUnitData(unit_id).rarity
    const base_id = parseInt(unit_id.substring(0, 4))

    const stmt_str = "INSERT INTO collection (discord_id, unit_id, base_id, rarity) " + 
      "VALUES(?, ?, ?, ?)"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(discord_id, unit_id, base_id, rarity)

    if (query.changes === 1) {
      return true
    } else {
      throw 'ERROR: Account Was Not Added'
    }
  }

  getUnit(discord_id, unit_id) {
    const stmt_str = "SELECT * FROM collection WHERE discord_id = ? AND unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(discord_id, unit_id)
    if (query === undefined) throw "ERROR: Unit Was Not Able To be Found"
    return query
  }

  getUnitFromBase(discord_id, base_id) {
    const stmt_str = "SELECT * FROM collection WHERE discord_id = ? AND base_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(discord_id, base_id)
    if (query === undefined) throw "ERROR: Unit Was Not Able To be Found"
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

    STAT_NAMES.forEach(stat => {
      power += stats[stat] * weights[stat + "_coefficient"]
    })

    power = Math.round(power)

    let sum_skills = unit.ub_level + unit.s1_level + unit.s2_level
		power += weights.skill_lv_coefficient * sum_skills;

    if (unit.rarity >= 5) {
			power += 150
      power += weights.exskill_evolution_coefficient * ex_level
		} else if (actor.config.rarity >= 6) {
			power += 2000;
			power += 5 * actor.union_burst;
      power += weights.exskill_evolution_coefficient * ex_level;
		} else {
      power += weights.skill_lv_coefficient * ex_level;
    }
    
    stats = this.getExSkillStats(unit, stats)
    stats.power = power
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
    const unit_promotion_status = this._master_db.getUnitPromotionStatus(unit.unit_id, unit.promotion_level)
    this._STAT_NAMES.forEach(stat => {
      stats[stat] += unit_promotion_status[stat]
    })
  
    return stats
  }

  getEquipmentStats(unit, stats) {
    for (let i = 1; i <= 6; i++) {
      let equipped = unit[`equip${i}`]
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
        let stat = this._NUMBER_TO_STAT[story["status_type_" + i]]
        if (stat !== undefined) {
          stats[stat] += storyStatus["status_rate_" + i];
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
