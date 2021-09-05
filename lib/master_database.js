// Dependencies 
const sqlite3 = require('better-sqlite3')
const path = require('path')
const fs = require('fs')

const ApiException = require('./api_exception')
const Current = require('./current')
const constants = require('./constants.json')


// Manages Priconne CDN Master DB
module.exports = class MasterDatabase {
  constructor() {
    const database_path = path.join(__dirname, '..', 'priconne-cdn-extract/out/en', 
      'masterdata/extract/latest', 'master')

    this._db = new sqlite3(database_path)
    this._current = new Current()
  }

  getRandomUnit(rarity) {
    const stmt_str = "SELECT * FROM unit_data " + 
      "INNER JOIN unlock_unit_condition " +
      "ON unit_data.unit_id = unlock_unit_condition.unit_id " +
      "WHERE rarity = ? AND start_time < ? AND end_time > ? " + 
      "ORDER BY RANDOM() LIMIT 1"
    const stmt = this._db.prepare(stmt_str)
    const current_time = this._current.getCurrentTime()
    const query = stmt.get(rarity, current_time, current_time)
    return query
  }

  getUnitData(unit_id) {
    const stmt_str = "SELECT * FROM unit_data WHERE unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(unit_id)
    if (query === undefined) throw new ApiException(500, "ERROR: Unit Was Not Able To be Found")
    return query
  }

  getUnitStatusCoefficient() {
    const stmt_str = "SELECT * FROM unit_status_coefficient"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get()
    if (query === undefined) throw new ApiException(500, "ERROR: Unit Status Was Not Able To be Found")
    return query
  }

  getShopStaticPriceGroup(total_exchanged, total_needed) {
    const stmt_str = "SELECT * FROM shop_static_price_group WHERE " + 
      "(buy_count_to > ? OR buy_count_to = -1) AND buy_count_from <= ? ORDER BY id ASC"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all(total_exchanged, total_needed)
    if (query === undefined) throw new ApiException(500, "ERROR: Amulet Exchange Was Not Able To be Found")
    return query
  }

  getUnitPromotionStatus(unit_id, promotion_level) {
    const stmt_str = "SELECT * FROM unit_promotion_status WHERE unit_id = ? AND promotion_level = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(unit_id, promotion_level)
    if (query === undefined) throw new ApiException(500, "ERROR: Unit Was Not Able To be Found")
    return query
  }

  getUnitPromotion(unit_id, promotion_level) {
    const stmt_str = "SELECT * FROM unit_promotion WHERE unit_id = ? AND promotion_level = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(unit_id, promotion_level)
    if (query === undefined) throw new ApiException(500, "ERROR: Unit Was Not Able To be Found")
    return query
  }

  getUnitRarity(unit_id, rarity) {
    const stmt_str = "SELECT * FROM unit_rarity WHERE unit_id = ? AND rarity = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(unit_id, rarity)
    if (query === undefined) throw new ApiException(500, "ERROR: Unit Was Not Able To be Found")
    return query
  }

  getMaxAscension(unit_id) {
    const stmt_str = "SELECT MAX(rarity) AS max_rarity FROM unit_rarity WHERE unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(unit_id)
    if (query === undefined) throw new ApiException(500, "ERROR: Unit Was Not Able To be Found")
    return query
  }

  getEquipmentData(equipment_id) {
    const stmt_str = "SELECT * FROM equipment_data WHERE equipment_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(equipment_id)
    if (query === undefined) throw new ApiException(500, "ERROR: Equipment Was Not Able To be Found")
    return query
  }

  getEquipmentEnhanceRate(equipment_id) {
    const stmt_str = "SELECT * FROM equipment_enhance_rate WHERE equipment_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(equipment_id)
    if (query === undefined) throw new ApiException(500, "ERROR: Equipment Was Not Able To be Found")

    // Attach a max refine var
    if (query.promotion_level >= 4) {
      query.max_refine = 5
    } else if (query.promotion_level === 3) {
      query.max_refine = 3
    } else if (query.promotion_level === 2) {
      query.max_refine = 1
    } else {
      query.max_refine = 0
    }

    return query
  }

  getEquipmentEnhanceData(promotion_level) {
    const stmt_str = "SELECT * FROM equipment_enhance_data WHERE promotion_level = ? AND equipment_enhance_level = ?"
    const stmt = this._db.prepare(stmt_str)
    let query = null
    if (promotion_level >= 4) {
      query = stmt.get(promotion_level, 5)
    } else if (promotion_level === 3) {
      query = stmt.get(promotion_level, 3)
    } else if (promotion_level === 2) {
      query = stmt.get(promotion_level, 1)
    } else {
      return 0
    }

    return query.total_point
  }

  getMaxedEquipment(equipment_id) {
    let equipment_data = this.getEquipmentData(equipment_id)
    // Equipping an item is an automatic max refine in this bot
    const refine_data = this.getEquipmentEnhanceRate(equipment_id)

    constants.STAT_NAMES.forEach(stat => {
      equipment_data[stat] += Math.ceil(refine_data[stat] * refine_data.max_refine)
    })

    return equipment_data
  }

  getBondStory(base_id) {
    const stmt_str = "SELECT * FROM story_detail " +
      "INNER JOIN chara_story_status " + 
      "ON story_detail.story_id = chara_story_status.story_id " +
      "WHERE ? IN (story_group_id, chara_id_1, chara_id_2, chara_id_3, chara_id_4, " + 
      "chara_id_5, chara_id_6, chara_id_7, chara_id_8, chara_id_8, chara_id_10) "
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all(base_id)
    if (query === undefined) throw new ApiException(500, "ERROR: Story Was Not Able To be Found")
    return query
  }

  getUnitSkillData(skill_id) {
    const stmt_str = "SELECT * FROM unit_skill_data WHERE unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(skill_id)
    if (query === undefined) throw new ApiException(500, "ERROR: Skills Were Not Able To be Found")
    return query
  }

  getSkillAction(skill_id) {
    const stmt_str = "SELECT * FROM skill_action WHERE action_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all(skill_id)
    if (query === undefined) throw new ApiException(500, "ERROR: Skills Were Not Able To be Found")
    return query
  }

  getExperienceTeam(exp) {
    const stmt_str = "SELECT team_level, total_exp, " + 
      "(SELECT MAX(team_level) from experience_team) as max_level " +
      "FROM experience_team " +
      "WHERE total_exp <= ? ORDER BY total_exp DESC"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(exp)
    if (query === undefined) throw new ApiException(500, "ERROR: Levels Were Not Able To be Found")
    return query
  }

  getExperienceTeamFromLevel(level) {
    const stmt_str = "SELECT * FROM experience_team WHERE team_level = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(level)
    if (query === undefined) throw new ApiException(500, "ERROR: Level Was Not Able To be Found")
    return query
  }

  getExperienceUnit(level) {
    const stmt_str = "SELECT unit_level, total_exp, " + 
      "(SELECT MAX(unit_level) from experience_unit) as max_level " + 
      "FROM experience_unit " + 
      "WHERE unit_level = ? ORDER BY total_exp DESC"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(level)
    if (query === undefined) throw new ApiException(500, "ERROR: Levels Were Not Able To be Found")
    return query
  }

  getSkillData(skill_id) {
    const stmt_str = "SELECT * FROM skill_data WHERE skill_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(skill_id)
    if (query === undefined) throw new ApiException(500, "ERROR: Skill Was Not Able To be Found")
    return query
  }

  getSkillCost(level) {
    const stmt_str = "SELECT * FROM skill_cost WHERE target_level = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(level)
    if (query === undefined) throw new ApiException(500, "ERROR: Skill Cost Was Not Able To be Found")
    return query
  }

  getSkillUnlockData(unlock_skill) {
    const stmt_str = "SELECT * FROM unlock_skill_data WHERE unlock_skill = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(unlock_skill)
    if (query === undefined) throw new ApiException(500, "ERROR: Skill Unlock Was Not Able To be Found")
    return query
  }

  getSkillUnlockDataFromPromotion(promotion_level) {
    const stmt_str = "SELECT * FROM unlock_skill_data WHERE promotion_level = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(promotion_level)
    return query
  }

  getLoveChara(love_level) {
    const stmt_str = "SELECT * FROM love_chara WHERE love_level = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(love_level)
    if (query === undefined) throw new ApiException(500, "ERROR: Bond Level Was Not Able To be Found")
    return query
  }

  getUnitSkills(unit_id) {
    const stmt_str = "SELECT * FROM unit_skill_data WHERE unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(unit_id)
    if (query === undefined) throw new ApiException(500, "ERROR: Unit Skill Data Was Not Able To be Found")
    return query
  }

  getActionsFromSkill(skill_id) {
    const skill_data = this.getSkillData(skill_id)
    let action_ids = []
    for (let i = 1; i <= 7; i++) {
      if (skill_data[`action_${i}`] !== 0) {
        action_ids.push(skill_data[`action_${i}`])
      }
    }

    let actions = []
    action_ids.forEach(action_id => {
      const stmt_str = "SELECT * FROM skill_action WHERE action_id = ?"
      const stmt = this._db.prepare(stmt_str)
      const query = stmt.get(action_id)
      if (query === undefined) throw new ApiException(500, "ERROR: Action Id Was Not Able To be Found")
      actions.push(query)
    })

    const skill = {
      skill_data: skill_data,
      actions: actions
    }

    return skill
  }

  close() {
    this._db.close()
  }
}
