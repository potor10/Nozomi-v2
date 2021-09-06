// Dependencies 
import sqlite3 from 'better-sqlite3'
import path from 'path'

import ApiException from '../api_exception.js'

import { SKILL_NAMES, EQUIP_SLOT_PREFIX, STAT_NAMES } from './constants/constants.js'

// Manages Account Portion of App Master Database
class CollectionDatabase {
  constructor(server_id) {
    const database_path = path.join(path.resolve(), 'database', `master_${server_id}`)
    this._db = new sqlite3(database_path)
  }

  /**
   * Initializes the database to it's default values
   */
  initDatabase() {
    const stmt_str = "CREATE TABLE IF NOT EXISTS collection ( " +
      "discord_id TEXT, unit_id INTEGER, base_id INTEGER, name TEXT, " + 
      "rarity INTEGER, level INTEGER DEFAULT 1, bond INTEGER DEFAULT 1, " + 
      "promotion_level INTEGER DEFAULT 1, " +
      `${SKILL_NAMES[0]} INTEGER DEFAULT 1, ${SKILL_NAMES[1]} INTEGER DEFAULT 0, ` +
      `${SKILL_NAMES[2]} INTEGER DEFAULT 0, ${SKILL_NAMES[3]} INTEGER DEFAULT 0, ` + 
      `${EQUIP_SLOT_PREFIX}1 INTEGER DEFAULT 0, ${EQUIP_SLOT_PREFIX}2 INTEGER DEFAULT 0, ` +
      `${EQUIP_SLOT_PREFIX}3 INTEGER DEFAULT 0, ${EQUIP_SLOT_PREFIX}4 INTEGER DEFAULT 0, ` +
      `${EQUIP_SLOT_PREFIX}5 INTEGER DEFAULT 0, ${EQUIP_SLOT_PREFIX}6 INTEGER DEFAULT 0,`
    STAT_NAMES.forEach(stat => { stmt_str += ` ${stat} INTEGER DEFAULT 0,`})
    stmt_str = stmt_str.slice(0, -1)
    stmt_str += " total_power INTEGER DEFAULT 0)"

    const stmt = this._db.prepare(stmt_str)
    stmt.run()
  }

  /**
   * Adds a new unit to the collection under the specified user
   * @param {String} discord_id the discord id of the user
   * @param {Object} unit the unit info to add
   * @return {boolean} true if successful
   */
  addUnit(discord_id, unit) {
    const base_id = parseInt(unit.unit_id.toString().substring(0, 4))
    const stmt_str = "INSERT INTO collection (discord_id, unit_id, base_id, name, rarity) VALUES(?, ?, ?, ?, ?)"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(discord_id, unit.unit_id, base_id, unit.unit_name, unit.rarity)

    if (query.changes === 1) return true
    else throw new ApiException(500, 'ERROR: Unit Was Not Added')
  }

  /**
   * Retrieves a unit owned by the specified user
   * @param {String} discord_id the discord id of the user
   * @param {Integer} unit_id the unit to get
   * @return {boolean} true if successful
   */
  getUnit(discord_id, unit_id) {
    const stmt_str = "SELECT * FROM collection WHERE discord_id = ? AND unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(discord_id, unit_id)
    return query
  }

  /**
   *  Retrieves all units owned by the specified use
   * @param {String} discord_id the discord id of the user
   * @return {Array} rows of unit objects
   */
   getAllUnits(discord_id) {
    const stmt_str = `SELECT * FROM collection WHERE discord_id = ? ORDER BY total_power DESC`
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all(discord_id)
    return query
  }

  /**
   * Retrieves a unit owned by the specified user
   * @param {String} discord_id the discord id of the user
   * @param {Integer} unit_id the unit to get
   * @return {boolean} true if successful
   */
  getUnitFromBase(discord_id, base_id) {
    const stmt_str = "SELECT * FROM collection WHERE discord_id = ? AND base_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(discord_id, base_id)
    return query
  }

  /**
   * Sets the rarity of a unit
   * @param {String} discord_id the discord id of the user
   * @param {Integer} unit_id the unit that is being updated
   * @param {Integer} rarity the new rarity of the unit
   * @return {boolean} true if successful
   */
  setRarity(discord_id, unit_id, rarity) {
    const stmt_str = "UPDATE collection SET rarity = ? WHERE discord_id = ? AND unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(rarity, discord_id, unit_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Rarity Was Not Updated')
  }

  /**
   * Sets the level of a unit
   * @param {String} discord_id the discord id of the user
   * @param {Integer} unit_id the unit that is being updated
   * @param {Integer} level the new level of the unit
   * @return {boolean} true if successful
   */
  setLevel(discord_id, unit_id, level) {
    const stmt_str = "UPDATE collection SET level = ? WHERE discord_id = ? AND unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(level, discord_id, unit_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Level Was Not Updated')
  }

  /**
   * Sets the bond level of a unit
   * @param {String} discord_id the discord id of the user
   * @param {Integer} unit_id the unit that is being updated
   * @param {Integer} bond the new bond level of the unit
   * @return {boolean} true if successful
   */
  setBond(discord_id, unit_id, bond) {
    const stmt_str = "UPDATE collection SET bond = ? WHERE discord_id = ? AND unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(bond, discord_id, unit_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Bond Was Not Updated')
  }

  /**
   * Sets the promotion level of a unit
   * @param {String} discord_id the discord id of the user
   * @param {Integer} unit_id the unit that is being updated
   * @param {Integer} promotion_level the new promotion level of the unit
   * @return {boolean} true if successful
   */
  setPromotionLevel(discord_id, unit_id, promotion_level) {
    const stmt_str = "UPDATE collection SET level = ? WHERE discord_id = ? AND unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(promotion_level, discord_id, unit_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Promotion Level Was Not Updated')
  }

  /**
   * Sets the skill levels of the unit owned by the user
   * @param {String} discord_id the discord id of the user
   * @param {Integer} unit_id the unit that is being updated
   * @param {Object} skills an object with { skill_name: skill_level }
   * @return {boolean} true if successful
   */
  setSkills(discord_id, unit_id, skills) {
    let stmt_str = "UPDATE collection SET"
    let skill_levels = []
    SKILL_NAMES.forEach(skill_name => {
      if (skills[skill_name] !== undefined) {
        stmt_str += ` ${skill_name} = ?,`
        skill_levels.push(skills[skill_name])
      }
    })
    stmt_str = stmt_str.slice(0,-1)
    stmt_str += " WHERE discord_id = ? AND unit_id = ?"

    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(...skill_levels, discord_id, unit_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Skills Were Not Updated')
  }

  /**
   * Sets the equipment of the user
   * @param {String} discord_id the discord id of the user
   * @param {Integer} unit_id the unit that is being updated
   * @param {Object} equip an object with { equip_name: equip_state }
   * @return {boolean} true if successful
   */
  setEquip(discord_id, unit_id, equip) {
    let stmt_str = "UPDATE collection SET"
    let equip_state = []
    for(let i = 1; i <= 6; i++) {
      if (equip[EQUIP_SLOT_PREFIX+i] !== undefined) {
        stmt_str += ` ${EQUIP_SLOT_PREFIX+i} = ?,`
        equip_state.push(equip[EQUIP_SLOT_PREFIX+i])
      }
    }
    stmt_str = stmt_str.slice(0,-1)
    stmt_str += " WHERE discord_id = ? AND unit_id = ?"

    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(...equip_state, discord_id, unit_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Equipment Was Not Updated')
  }

    /**
   * Sets the equipment of the user
   * @param {String} discord_id the discord id of the user
   * @param {Integer} unit_id the unit that is being updated
   * @param {Object} stats an object with { stat_name: stat_value }
   * @return {boolean} true if successful
   */
  setStats(discord_id, unit_id, stats) {
    let stmt_str = "UPDATE collection SET"
    let stat_values = []
    STAT_NAMES.forEach(stat => {
      if (stats[stat] !== undefined) {
        stmt_str += ` ${stat} = ?,`
        stat_values.push(stats[stat])
      }
    })
    stmt_str = stmt_str.slice(0,-1)
    stmt_str += " WHERE discord_id = ? AND unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(...stat_values, discord_id, unit_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Stats Was Not Updated')
  }

  /**
   * Sets the total power of a unit
   * @param {String} discord_id the discord id of the user
   * @param {Integer} unit_id the unit that is being updated
   * @param {Integer} total_power the new power of the unit
   * @return {boolean} true if successful
   */
  setTotalPower(discord_id, unit_id, total_power) {
    const stmt_str = "UPDATE collection SET total_power = ? WHERE discord_id = ? AND unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(total_power, discord_id, unit_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Total Power Was Not Updated')
  }

  /**
   * Resets the database to it's initial positon
   */
  reset() {
    const stmt = this._db.prepare('DROP TABLE collection')
    stmt.run()
    this.init()
  }

  /**
   * Closes the sqlite cursor
   */
  close() {
    this._db.close()
  }
}

export default CollectionDatabase