// Module Dependencies 
import sqlite3 from 'better-sqlite3'
import path from 'path'

// Class Imports
import ApiException from '../api_exception.js'

// Manages Account Portion of App Master Database
class GachaDatabase {
  constructor(server_id) {
    const database_path = path.join(path.resolve(), 'database', `master_${server_id}`)
    this._db = new sqlite3(database_path)
    this.initDatabase()
  }

  /**
   * Initializes the user database with a table
   */
  initDatabase() {
    const stmt_str = "CREATE TABLE IF NOT EXISTS gacha ( " +
      "discord_id TEXT, gacha_id INTEGER," + 
      "last_discount TEXT, last_pull TEXT)"

    const stmt = this._db.prepare(stmt_str)
    stmt.run()
  }

  /**
   * Adds a new user to the gacha database
   * @param {String} discord_id of the user gacha relationship
   * @param {Integer} gacha_id of the user gacha relationship
   * @return {boolean} result of adding the user gacha relationship
   */
  addGacha(discord_id, gacha_id) {
    const stmt_str = "INSERT INTO gacha (discord_id, gacha_id) VALUES(?, ?)"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(discord_id, gacha_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'User-Gacha Relationship Was Not Created')
  }

  /**
   * Gets (or creates) a gacha relationship to the database
   * @param {String} discord_id of the user gacha relationship
   * @param {Integer} gacha_id of the user gacha relationship
   * @return {Object} result of the user gacha relationship
   */
  getGacha(discord_id, gacha_id) {
    const stmt_str = "SELECT * FROM gacha WHERE discord_id = ? AND gacha_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(discord_id, gacha_id)

    if (query === undefined) {
      this.addGacha(discord_id, gacha_id)
      return this.getGacha(discord_id, gacha_id)
    }
    return query
  }

  /**
   * Sets the date of the last pull 
   * @param {String} discord_id of the user gacha relationship
   * @param {Integer} gacha_id of the user gacha relationship
   * @param {String} last_pull new formatted date time of the last pull
   * @return {Object} result of the user gacha relationship
   */
  setGachaLastPull(discord_id, gacha_id, last_pull) {
    const stmt_str = "UPDATE gacha SET last_pull = ? WHERE discord_id = ? AND gacha_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(last_pull, discord_id, gacha_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Last Pull Was Not Updated')
  }

  /**
   * Sets the date of the last discount 
   * @param {String} discord_id of the user gacha relationship
   * @param {Integer} gacha_id of the user gacha relationship
   * @param {String} last_discount new formatted date time of the last discounted pull
   * @return {Object} result of the user gacha relationship
   */
  setGachaLastDiscount(discord_id, gacha_id, last_discount) {
    const stmt_str = "UPDATE gacha SET last_discount = ? WHERE discord_id = ? AND gacha_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(last_discount, discord_id, gacha_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Last Discount Was Not Updated')
  }

  /**
   * Resets the database to it's initial position
   */
  resetDatabase() {
    const stmt = this._db.prepare('DROP TABLE gacha')
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

export default GachaDatabase