// Module Dependencies 
import sqlite3 from 'better-sqlite3'
import path from 'path'

// Class Imports
import ApiException from '../api_exception.js'

// Manages Account Portion of App Master Database
class UserDatabase {
  constructor(server_id) {
    const database_path = path.join(path.resolve(), 'database', `master_${server_id}`)
    this._db = new sqlite3(database_path)
  }

  /**
   * Initializes the user database with a table
   */
  initDatabase() {
    const stmt_str = "CREATE TABLE IF NOT EXISTS users ( " +
      "discord_id TEXT PRIMARY KEY, mana INTEGER DEFAULT 0," + 
      "jewels INTEGER DEFAULT 0, amulets INTEGER DEFAULT 0, " +
      "princess_hearts INTEGER DEFAULT 0, " +
      "exp INTEGER DEFAULT 0, level INTEGER DEFAULT 1, " + 
      "daily TEXT, total_power INTEGER DEFAULT 0, " + 
      "exchange_points INTEGER DEFAULT 0)"

    const stmt = this._db.prepare(stmt_str)
    stmt.run()
  }

  /**
   * Adds a new user to the user database
   * @param {String} discord_id of the user
   * @return {boolean} result of user has been added
   */
  addUser(discord_id) {
    const stmt_str = "INSERT INTO users (discord_id) VALUES(?)"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(discord_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'User Was Not Created')
  }

  /**
   * Gets a user from the user database or creates a new user if they don't exist
   * @param {String} discord_id of the user
   * @return {Object} user data
   */
  getUser(discord_id) {
    const stmt_str = "SELECT * FROM users WHERE discord_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(discord_id)

    if (query === undefined) {
      this.addUser(discord_id)
      return this.getUser(discord_id)
    }
    return query
  }

  /**
   * Gets all specified users 
   * @param {Array} discord_ids the users we are looking for
   * @return {Array} array of user data objects
   */
  getUsers(discord_ids) {
    const stmt_str = "SELECT * FROM users WHERE discord_id IN (" + 
      "?, ".repeat(discord_ids.length).slice(0, -2) + ") ORDER BY total_power DESC"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all(...discord_ids)
    if (query === undefined) throw new ApiException(500, 'Not able to find users')
    return query
  }

  /**
   * Sets the mana of the user
   * @param {String} discord_id the discord id of the user
   * @param {Integer} mana the new mana of the user
   * @return {boolean} true if successful
   */
  setMana(discord_id, mana) {
    const stmt_str = "UPDATE users SET mana = ? WHERE discord_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(mana, discord_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Mana Was Not Updated')
  }

  /**
   * Sets the jewels of the user
   * @param {String} discord_id the discord id of the user
   * @param {Integer} jewels the new jewels of the user
   * @return {boolean} true if successful
   */
  setJewels(discord_id, jewels) {
    const stmt_str = "UPDATE users SET jewels = ? WHERE discord_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(jewels, discord_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Jewels Were Not Updated')
  }

  /**
   * Sets the amulets of the user
   * @param {String} discord_id the discord id of the user
   * @param {Integer} amulets the new amulets of the user
   * @return {boolean} true if successful
   */
  setAmulets(discord_id, amulets) {
    const stmt_str = "UPDATE users SET amulets = ? WHERE discord_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(amulets, discord_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Amulets Were Not Updated')
  }

  /**
   * Sets the princess hearts of the user
   * @param {String} discord_id the discord id of the user
   * @param {Integer} princess_hearts the new princess_hearts of the user
   * @return {boolean} true if successful
   */
  setPrincessHearts(discord_id, princess_hearts) {
    const stmt_str = "UPDATE users SET princess_hearts = ? WHERE discord_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(princess_hearts, discord_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Princess Hearts Were Not Updated')
  }

  /**
   * Sets the exp of the user
   * @param {String} discord_id the discord id of the user
   * @param {Integer} exp the new exp of the user
   * @return {boolean} true if successful
   */
  setExp(discord_id, exp) {
    const stmt_str = "UPDATE users SET exp = ? WHERE discord_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(exp, discord_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Exp Was Not Updated')
  }

  /**
   * Sets the level of the user
   * @param {String} discord_id the discord id of the user
   * @param {Integer} level the new level of the user
   * @return {boolean} true if successful
   */
  setLevel(discord_id, level) {
    const stmt_str = "UPDATE users SET level = ? WHERE discord_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(level, discord_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Level Was Not Updated')
  }

  /**
   * Sets the time of daily claim of the user
   * @param {String} discord_id the discord id of the user
   * @param {Integer} daily the new time of daily claim for the user
   * @return {boolean} true if successful
   */
  setDaily(discord_id, daily) {
    const stmt_str = "UPDATE users SET daily = ? WHERE discord_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(daily, discord_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Daily Was Not Updated')
  }

  /**
   * Sets the power of the user
   * @param {String} discord_id the discord id of the user
   * @param {Integer} power the new power of the user
   * @return {boolean} true if successful
   */
  setTotalPower(discord_id, power) {
    const stmt_str = "UPDATE users SET total_power = ? WHERE discord_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(power, discord_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Total Account Power Was Not Updated')
  }

  /**
   * Sets the exchange points of the user
   * @param {String} discord_id the discord id of the user
   * @param {Integer} exchange_points the new exchange points of the user
   * @return {boolean} true if successful
   */
  setExchangePoints(discord_id, exchange_points) {
    const stmt_str = "UPDATE users SET exchange_point = ? WHERE discord_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(exchange_points, discord_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Exchange Points Was Not Updated')
  }

  /**
   * Resets the database to it's initial position
   */
  resetDatabase() {
    const stmt = this._db.prepare('DROP TABLE users')
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

export default UserDatabase