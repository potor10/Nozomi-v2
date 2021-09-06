// Module Dependencies 
import sqlite3 from 'better-sqlite3'
import path from 'path'

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
  getGachaExchangeLineup(exchange_id, rarity) {
    const stmt_str = "SELECT * FROM gacha_exchange_lineup WHERE exchange_id = ? AND rarity = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all(exchange_id, rarity)
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
