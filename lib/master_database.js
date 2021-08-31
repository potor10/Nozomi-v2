// Dependencies 
const sqlite3 = require('better-sqlite3')
const Current = require('./current')
const path = require('path')
const fs = require('fs')

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

  getUnitData(id) {
    const stmt_str = "SELECT * FROM unit_data WHERE unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(id)
    if (query === undefined) throw "ERROR: Unit Was Not Able To be Found"

    return query
  }

  getUnitStatusCoefficient() {
    const stmt_str = "SELECT * FROM unit_status_coefficient"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get()
    return query
  }

  getUnitPromotionStatus(id, promotion_level) {
    const stmt_str = "SELECT * FROM unit_promotion_status WHERE unit_id = ? AND promotion_level = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(id, promotion_level)
    if (query === undefined) throw "ERROR: Unit Was Not Able To be Found"
    return query
  }

  getUnitPromotion(id, promotion_level) {
    const stmt_str = "SELECT * FROM unit_promotion WHERE unit_id = ? AND promotion_level = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(id, promotion_level)
    if (query === undefined) throw "ERROR: Unit Was Not Able To be Found"
    return query
  }

  getUnitRarity(id, rarity) {
    const stmt_str = "SELECT * FROM unit_rarity WHERE unit_id = ? AND rarity = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(id, rarity)
    if (query === undefined) throw "ERROR: Unit Was Not Able To be Found"
    return query
  }

  getEquipmentData(id) {
    const stmt_str = "SELECT * FROM equipment_data WHERE equipment_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(id)
    if (query === undefined) throw "ERROR: Equipment Was Not Able To be Found"
    return query
  }

  getEquipmentEnhanceRate(id) {
    const stmt_str = "SELECT * FROM equipment_enhance_rate WHERE equipment_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(id)
    if (query === undefined) throw "ERROR: Equipment Was Not Able To be Found"

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

  getBondStory(base_id) {
    const stmt_str = "SELECT * FROM story_detail " +
      "INNER JOIN chara_story_status " + 
      "ON story_detail.story_id = chara_story_status.story_id " +
      "WHERE ? IN (story_group_id, chara_id_1, chara_id_2, chara_id_3, chara_id_4, " + 
      "chara_id_5, chara_id_6, chara_id_7, chara_id_8, chara_id_8, chara_id_10) "
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all(base_id)
    if (query === undefined) throw "ERROR: Story Was Not Able To be Found"
    return query
  }

  getUnitSkillData(id) {
    const stmt_str = "SELECT * FROM unit_skill_data WHERE unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(id)
    if (query === undefined) throw "ERROR: Skills Were Not Able To be Found"
    return query
  }

  getSkillAction(id) {
    const stmt_str = "SELECT * FROM skill_action WHERE action_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all(id)
    if (query === undefined) throw "ERROR: Skills Were Not Able To be Found"
    return query
  }

  close() {
    this._db.close()
  }
}
