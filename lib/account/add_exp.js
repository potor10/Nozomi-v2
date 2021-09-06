// Import Classes
import UserDatabase from '../databases/user_database.js'

// Import Functions
import dailyTime from '../time/daily_time.js'

// Import Constants
import { DAILY_INCOME } from './constants/constants.js'


addExp(id, amt) {
  const user = this.getUser(id)
  let current_exp = user.exp + amt
  let current_level = user.level

  const new_level = this._master_db.getExperienceTeam(current_exp + amt)
  if (current_exp + amt > new_level.total_exp) {
    // We are at max level, don't change xp
    if (new_level.max_level === new_level.team_level) {
      current_exp = new_level.total_exp
      current_level = new_level.max_level - 1
    } else {
      current_level = new_level.team_level
    }
  }

  console.log(current_exp, current_level)

  const stmt_str = "UPDATE accounts SET exp = ?, level = ? WHERE discord_id = ?"
  const stmt = this._db.prepare(stmt_str)
  const query = stmt.run(current_exp, current_level, id)

  if (query.changes === 1) {
    return true
  } else {
    throw new ApiException(500, 'ERROR: Exp Was Not Updated')
  }
}