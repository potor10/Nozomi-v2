// Dependencies 
const sqlite3 = require('better-sqlite3')
const Current = require('./current')
const path = require('path')
const fs = require('fs')

// Manages Account Portion of App Master Database
module.exports = class AccountDatabase {
  constructor() {
    const database_path = path.join(__dirname, '..', 'database', 'master')

    this._db = new sqlite3(database_path)
    this._current = new Current()

    this.init()
  }

  init() {
    const stmt_str = "CREATE TABLE IF NOT EXISTS accounts ( " +
      "discord_id TEXT PRIMARY KEY, mana INTEGER DEFAULT 0," + 
      "jewels INTEGER DEFAULT 0, amulets INTEGER DEFAULT 0, " +
      "exp INTEGER DEFAULT 0, level INTEGER DEFAULT 1, daily TEXT DEFAULT 0)"

    const stmt = this._db.prepare(stmt_str)
    stmt.run()
  }

  addAccount(id) {
    const stmt_str = "INSERT INTO accounts (discord_id) VALUES(?)"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(id)

    if (query.changes === 1) {
      return true
    } else {
      throw 'ERROR: Account Was Not Added'
    }
  }

  getUser(id) {
    const stmt_str = "SELECT * FROM accounts WHERE discord_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(id)
    if (query === undefined) throw "ERROR: User Was Not Able To be Found"

    return query
  }

  addMana(id, amt) {
    const current_mana = this.getUser(id).mana

    if (current_mana + amt < 0) {
      return false
    }

    const stmt_str = "UPDATE accounts SET mana = ? WHERE discord_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(current_mana + amt, id)

    if (query.changes === 1) {
      return true
    } else {
      throw 'ERROR: Mana Was Not Updated'
    }
  }

  addJewels(id, amt) {
    const current_jewels = this.getUser(id).jewels

    if (current_jewels + amt < 0) {
      return false
    }

    const stmt_str = "UPDATE accounts SET jewels = ? WHERE discord_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(current_jewels + amt, id)

    if (query.changes === 1) {
      return true
    } else {
      throw 'ERROR: Jewels Was Not Updated'
    }
  }

  addAmulets(id, amt) {
    const current_amulets = this.getUser(id).amulets

    if (current_amulets + amt < 0) {
      return false
    }

    const stmt_str = "UPDATE accounts SET amulets = ? WHERE discord_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(current_amulets + amt, id)

    if (query.changes === 1) {
      return true
    } else {
      throw 'ERROR: Amulets Was Not Updated'
    }
  }

  addExp(id, amt) {
    const user = this.getUser(id)
    const current_exp = user.exp
    const current_level = user.level
    const new_level = 1 + Math.floor(Math.pow(current_exp + amt, 0.8) / 10)

    if (new_level > current_level) {
      this.setLevel(id, new_level)
    }

    const stmt_str = "UPDATE accounts SET exp = ? WHERE discord_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(current_exp + amt, id)

    if (query.changes === 1) {
      return true
    } else {
      throw 'ERROR: Exp Was Not Updated'
    }
  }

  setLevel(id, amt) {
    const stmt_str = "UPDATE accounts SET level = ? WHERE discord_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(amt, id)

    if (query.changes === 1) {
      return true
    } else {
      throw 'ERROR: Level Was Not Updated'
    }
  }

  daily(id) {
    const current_daily = this.getUser(id).daily
    const daily = this._current.getDaily()

    if (current_daily < daily) {
      this.addJewels(id, 1500)
      this.addMana(id, 300000)

      const stmt_str = "UPDATE accounts SET daily = ? WHERE discord_id = ?"
      const stmt = this._db.prepare(stmt_str)
      const query = stmt.run(daily, id)
  
      if (query.changes === 1) {
        return true
      } else {
        throw 'ERROR: Daily Was Not Updated'
      }
    }

    return false
  }

  reset() {
    const stmt = this._db.prepare('DROP TABLE accounts')
    stmt.run()
    this.init()
  }

  close() {
    this._db.close()
  }
}
