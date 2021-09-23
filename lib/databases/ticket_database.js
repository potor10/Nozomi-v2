// Module Dependencies 
import sqlite3 from 'better-sqlite3'
import path from 'path'

// Class Imports
import ApiException from '../api_exception.js'

// Manages Support Ticket Portion of App Master Database
class TicketDatabase {
  constructor() {
    const database_path = path.join(path.resolve(), 'database', `support`)
    this._db = new sqlite3(database_path)
    this.initDatabase()
  }

  /**
   * Initializes the user database with a table
   */
  initDatabase() {
    const stmt_str = "CREATE TABLE IF NOT EXISTS tickets ( " +
      "ticket_id INTEGER PRIMARY KEY, discord_id TEXT, server_id, TEXT, " + 
      "ticket_title TEXT, ticket_description TEXT, contact TEXT, " + 
      "created_on TEXT, resolved INTEGER DEFAULT 0)"

    const stmt = this._db.prepare(stmt_str)
    stmt.run()
  }

  /**
   * Adds a new support ticket
   * @param {String} discord_id of the user who is opening the ticket
   * @param {String} server_id of the server in which the ticket is opened in
   * @param {String} ticket_title the title of the support ticket
   * @param {String} ticket_description the description of the support ticket
   * @param {String} contact the contact information of the user opening the ticket
   * @param {String} created_on the formatted date the ticket was created
   * @return {boolean} result of adding the support ticket
   */
  addTicket(discord_id, server_id, ticket_title, ticket_description, contact, created_on) {
    const stmt_str = "INSERT INTO tickets " + 
      "(discord_id, server_id, ticket_title, ticket_description, contact, created_on) " + 
      "VALUES(?, ?, ?, ?, ?, ?)"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(discord_id, server_id, ticket_title, ticket_description, contact, created_on)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Ticket Was Not Created')
  }

  /**
   * Gets the unresolved tickets of the user
   * @param {String} discord_id of the user requesting their support tickets
   * @return {Array} array of row objects containing the user's support tickets
   */
  getTickets(discord_id) {
    const stmt_str = "SELECT * FROM tickets WHERE discord_id = ? AND resolved = 0"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all(discord_id)
    return query
  }

  /**
   * Resolves a ticket of the user
   * @param {String} discord_id of the user requesting to resolve a support ticket
   * @param {Integer} ticket_id is the ticket that is looking to be resolved
   * @return {boolean} result of resolving the support ticket
   */
  resolveTicket(discord_id, ticket_id) {
    const stmt_str = "UPDATE tickets SET resolved = 1 WHERE discord_id = ? AND ticket_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.run(discord_id, ticket_id)
    if (query.changes === 1) return true
    else throw new ApiException(500, 'Ticket Was Not Resolved')
  }

  /**
   * Resets the database to it's initial position
   */
  resetDatabase() {
    const stmt = this._db.prepare('DROP TABLE tickets')
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

export default TicketDatabase