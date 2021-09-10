// Module Dependencies 
import sqlite3 from 'better-sqlite3'
import path from 'path'

// Constants
import { STAT_NAMES } from '../constants.js'

// Manages Priconne CDN Master DB
class MasterDatabase {
  constructor() {
    const database_path = path.join(path.resolve(), 'priconne-cdn-extract/out/en', 
      'masterdata/extract/latest', 'master')
    this._db = new sqlite3(database_path)
  }

  /**
   * Obtains the gacha data from the master database
   * @param {String} time The current time (formatted)
   * @return {Array} array of row objects
   */
  getGachaData(time) {
    const stmt_str = "SELECT * FROM gacha_data WHERE start_time <= ? AND end_time >= ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all(time, time)
    return query
  }

  /**
   * Obtains all the obtainable units from current gacha
   * @param {Integer} rarity the rarity of units
   * @param {String} time The current time (formatted)
   * @return {Array} array of row objects
   */
  getGachaUnits(rarity, time) {
    const stmt_str = "SELECT * FROM unit_data INNER JOIN unlock_unit_condition " + 
      "ON unit_data.unit_id = unlock_unit_condition.unit_id " +
      "WHERE rarity = ? AND start_time <= ? AND end_time >= ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all(rarity, time, time)
    return query
  }

  /**
   * Obtains the gacha exchange from the master database
   * @param {Integer} exchange_id current exchange rotation
   * @return {Array} array of row objects
   */
  getGachaExchangeLineup(exchange_id) {
    const stmt_str = "SELECT * FROM gacha_exchange_lineup WHERE exchange_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all(exchange_id)
    return query
  }

  /**
   * Obtains the experience needed for a certain level
   * @return {Array} array of row objects containing level up data
   */
  getExperienceTeam() {
    const stmt_str = "SELECT * FROM experience_team"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all()
    return query
  }

  /**
   * Obtains the experience needed to level up a unit
   * @return {Array} array of row objects containing unit level up data
   */
  getExperienceUnit() {
    const stmt_str = "SELECT * FROM experience_unit"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all()
    return query
  }

  /**
   * Obtains the rarity & stat growth of a unit
   * @param {Integer} unit_id the id of the unit we are looking for
   * @return {Array} array of row objects containing level up data
   */
  getUnitRarity(unit_id) {
    const stmt_str = "SELECT * FROM unit_rarity" + (unit_id ? " WHERE unit_id = ?" : "")
    const stmt = this._db.prepare(stmt_str)
    let query = unit_id ? stmt.all(unit_id) : stmt.all()
    return query
  }

  /**
   * Obtains the data of a unit
   * @param {Integer} unit_id the id of the unit we are looking for
   * @return {Object} data of the unit
   */
  getUnitData(unit_id) {
    const stmt_str = "SELECT * FROM unit_data WHERE unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(unit_id)
    return query
  }

  /**
   * Obtains the profile of a unit
   * @param {Integer} unit_id the id of the unit we are looking for
   * @return {Object} profile data of the unit
   */
  getUnitProfile(unit_id) {
    const stmt_str = "SELECT * FROM unit_profile WHERE unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(unit_id)
    return query
  }

  /**
   * Obtains the comments of a unit
   * @param {Integer} unit_id the id of the unit we are looking for
   * @return {Array} rows of comment data of the unit
   */
  getUnitComments(unit_id) {
    const stmt_str = "SELECT * FROM unit_comments WHERE unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all(unit_id)
    return query
  }

  /**
   * Obtains the relevant bond stories for the character
   * @param {Integer} base_id the first 4 numbers of of the unit_id
   * @return {Array} array of row objects containing bond story data
   */
  getBondStory(base_id) {
    const stmt_str = "SELECT * FROM story_detail INNER JOIN chara_story_status " + 
      "ON story_detail.story_id = chara_story_status.story_id " +
      "WHERE ? IN (story_group_id, chara_id_1, chara_id_2, chara_id_3, chara_id_4, " + 
      "chara_id_5, chara_id_6, chara_id_7, chara_id_8, chara_id_8, chara_id_10) "
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all(base_id)
    if (query === undefined) throw new ApiException(500, "ERROR: Story Was Not Able To be Found")
    return query
  }

  /**
   * Obtains the relevant unit promotion status for the character
   * @param {Integer} unit_id the id of the unit we are looking for
   * @return {Array} array of row objects containing unit promotion status data
   */
  getUnitPromotionStatus(unit_id) {
    const stmt_str = "SELECT * FROM unit_promotion_status WHERE unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all(unit_id)
    if (query === undefined) throw new ApiException(500, "ERROR: Unit Promotion Status Was Not Able To be Found")
    return query
  }

  /**
   * Obtains the relevant unit promotion status for the character
   * @param {Integer} unit_id the id of the unit we are looking for
   * @return {Array} array of row objects containing unit promotion data
   */
  getUnitPromotion(unit_id) {
    const stmt_str = "SELECT * FROM unit_promotion" + (unit_id ? " WHERE unit_id = ?" : "")
    const stmt = this._db.prepare(stmt_str)
    let query = unit_id ? stmt.all(unit_id) : stmt.all()
    return query
  }

  /**
   * Obtains data on all the equipment in the game
   * @param {Integer} equipment_id is an optional indicator of which equipment to get
   * @return {Array} array of row objects containing equipment data
   */
  getEquipmentData(equipment_id) {
    const stmt_str = "SELECT * FROM equipment_data" + (equipment_id ? " WHERE equipment_id = ?" : "")
    const stmt = this._db.prepare(stmt_str)
    const query = equipment_id ? stmt.get(equipment_id) : stmt.all()
    return query
  }

  /**
   * Obtains data on all the equipment enhance rate / stats in the game
   * @return {Array} array of row objects containing equipment enhance data
   */
  getEquipmentEnhance(equipment_id) {
    let stmt_str = "SELECT equipment_id, equipment_name, description, " + 
      "equipment_enhance_rate.promotion_level AS promotion_level,"
    STAT_NAMES.forEach(stat => {stmt_str += ` ${stat},`})
    stmt_str += " ifnull(MAX(total_point), 0) as total_point FROM equipment_enhance_rate " +
      "LEFT JOIN equipment_enhance_data " +
      "ON equipment_enhance_rate.promotion_level = equipment_enhance_data.promotion_level "
    stmt_str += (equipment_id ? "WHERE equipment_id = ? " : "")
    stmt_str += "GROUP BY equipment_id"
    const stmt = this._db.prepare(stmt_str)
    const query = equipment_id ? stmt.get(equipment_id) : stmt.all()
    return query
  }

  /**
   * Obtains the relevant skills of the character
   * @param {Integer} unit_id the id of the unit we are looking for
   * @return {Object} relational unit skill info
   */
  getUnitSkillData(unit_id) {
    const stmt_str = "SELECT * FROM unit_skill_data WHERE unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(unit_id)
    return query
  }

  /**
   * Obtains the actions of the character
   * @param {Integer} base_id the base_id of the character
   * @return {Object} skill action info
   */
  getSkillAction(base_id) {
    const stmt_str = "SELECT * FROM skill_action WHERE action_id LIKE ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all(`${base_id}%`)
    return query
  }

  /**
   * Obtains stat weight to power
   * @return {Object} stat weights
   */
  getUnitStatusCoefficient() {
    const stmt_str = "SELECT * FROM unit_status_coefficient"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get()
    return query
  }

  /**
   * Obtains the shop price for amulet exchange
   * @return {Array} of shop prices
   */
  getShopStaticPriceGroup() {
    const stmt_str = "SELECT * FROM shop_static_price_group"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all()
    return query
  }

  /**
   * Obtains the amount of love needed to reach the next bond level
   * @return {Array} of love / bond relationships
   */
  getLoveChara() {
    const stmt_str = "SELECT * FROM love_chara"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all()
    return query
  }

  /**
   * Obtains the skill unlocked after reaching a certain promotion level
   * @return {Array} of skill unlock / promotion relationships
   */
  getUnlockSkillData() {
    const stmt_str = "SELECT * FROM unlock_skill_data"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all()
    return query
  }

  /**
   * Obtains the information of skill level up cost
   * @return {Array} of row objects containing skill / cost relationships
   */
  getSkillCost() {
    const stmt_str = "SELECT * FROM skill_cost"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all()
    return query
  }

  /**
   * Obtains the information of all character skills
   * @return {Array} of row objects containing skill / action relationships
   */
  getSkillData(base_id) {
    const stmt_str = "SELECT * FROM skill_data WHERE skill_id LIKE ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all(`${base_id}%`)
    return query
  }


  /**
   * Closes the sqlite cursor
   */
  close() {
    this._db.close()
  }
}

export default MasterDatabase
