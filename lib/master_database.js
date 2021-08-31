// Dependencies 
const sqlite3 = require('better-sqlite3')
const Current = require('./current')
const path = require('path')
const fs = require('fs')

// Manages Priconne CDN Master DB
module.exports = class MasterDatabase {
  constructor () {
    const master_path = path.join(__dirname, '..', 'priconne-cdn-extract/out/en', 
      'masterdata/extract/latest', 'master')
    console.log(master_path)
    this._db = new sqlite3(master_path)
    this._current = new Current()
  }

  getRandomUnit (rarity) {
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
}
