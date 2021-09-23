// Module Dependencies 
import sqlite3 from 'better-sqlite3'
import path from 'path'

// Class Imports
import ApiException from '../api_exception.js'

// Manages Support Ticket Portion of App Master Database
class CodeDatabase {
  constructor() {
    const database_path = path.join(path.resolve(), 'database', `support`)
    this._db = new sqlite3(database_path)
    this.initDatabase()
  }

  /**
   * Initializes the user database with a table
   */
  initDatabase() {
    const stmt_str = "CREATE TABLE IF NOT EXISTS codes ( " +
      "code_hash TEXT UNIQUE, reward_type TEXT, reward_value INTEGER, " + 
      "target_server TEXT, uses INTEGER DEFAULT 0, max_use INTEGER, expiration TEXT)"

    const stmt = this._db.prepare(stmt_str)
    stmt.run()
  }

  /**
   * Adds a new secret code
   * @param {String} reward_type the type of reward
   * @param {Integer} reward_value the value of the reward
   * @param {String} target_server id of the server the code can be redeemed in
   * @param {Integer} max_use the maximum uses of the code
   * @param {String} expiration the time of expiration
   * @return {String} hash of the new code that has been generated
   */
  addCode(reward_type, reward_value, target_server=null, max_use=1, expiration='9999/01/01 23:59:59') {
    let code_hash = Math.random().toString(36).substr(2).repeat(5)
    while (this.getCode(code_hash) !== undefined) {
      // Generate anothe hash
      code_hash = Math.random().toString(36).substr(2).repeat(5)
    }

    const stmt_str = "INSERT INTO codes " + 
      "(code_hash, reward_type, reward_value, target_server, max_use, expiration) " + 
      "VALUES(?, ?, ?, ?, ?, ?)"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(code_hash, reward_type, reward_value, target_server, max_use, expiration)
    if (query.changes === 1) return code_hash
    else throw new ApiException(500, 'Code Was Not Created')
  }

  /**
   * Gets the specified code
   * @param {String} code_hash is the hash of the code
   * @return {Object} code data
   */
  getCode(code_hash) {
    const stmt_str = "SELECT * FROM codes WHERE code_hash = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(code_hash)
    return query
  }

  /**
   * Increments the code's usage count by 1
   * @param {String} code_hash is the hash of the code
   * @return {boolean} result of using the specified code
   */
  useCode(code_hash) {
    const stmt_str = "UPDATE codes SET uses = uses + 1 WHERE code_hash = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(code_hash)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Use Code Was Not Sucessful')
  }

  /**
   * Resets the database to it's initial position
   */
  resetDatabase() {
    const stmt = this._db.prepare('DROP TABLE codes')
    stmt.run()
    this.initDatabase()
  }

  /**
   * Closes the sqlite cursor
   */
  close() {
    this._db.close()
  }
}

export default CodeDatabase