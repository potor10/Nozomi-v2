// Module Dependencies 
import sqlite3 from 'better-sqlite3'
import path from 'path'

// Class Imports
import ApiException from '../api_exception.js'

// Manages Account Portion of App Master Database
class RedeemDatabase {
  constructor(server_id) {
    const database_path = path.join(path.resolve(), 'database', `master_${server_id}`)
    this._db = new sqlite3(database_path)
  }

  /**
   * Initializes the user database with a table
   */
  initDatabase() {
    const stmt_str = "CREATE TABLE IF NOT EXISTS redeem (code_hash TEXT, discord_id TEXT)"

    const stmt = this._db.prepare(stmt_str)
    stmt.run()
  }

  /**
   * Adds a new discord user - hash relationship
   * @param {String} code_hash hash of the code
   * @param {String} discord_id id of the user
   * @return {boolean} result of adding the user - hash relationship
   */
  addRedeem(code_hash, discord_id) {
    const stmt_str = "INSERT INTO redeem (code_hash, discord_id) VALUES(?, ?)"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(code_hash, discord_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'User-Hash Relationship Was Not Created')
  }

  /**
   * Gets a user - hash relationship
   * @param {String} code_hash hash of the code
   * @param {String} discord_id id of the user
   * @return {Object} result of the user - hash relationship
   */
  getRedeem(code_hash, discord_id) {
    const stmt_str = "SELECT * FROM redeem WHERE code_hash = ? AND discord_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(code_hash, discord_id)
    return query
  }

  /**
   * Resets the database to it's initial position
   */
  resetDatabase() {
    const stmt = this._db.prepare('DROP TABLE redeem')
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

export default RedeemDatabase