// Import Classes
import UserDatabase from '../databases/user_database.js'

// Import Functions
import dailyTime from '../time/daily_time.js'

// Import Constants
import { DAILY_INCOME } from '../constants.js'

/**
 * Runs the daily gem / mana generation script on a user
 * @param {String} discord_id is the discord id of the user
 * @param {String} server_id is the server that is being called from
 * @return {boolean} status of request
 */
const daily = (discord_id, server_id) => {
  const user_db = new UserDatabase(server_id)
  const user = user_db.getUser(discord_id)

  if (user.daily !== dailyTime()) {
    user_db.setJewels(discord_id, user.jewels + DAILY_INCOME.jewels)
    user_db.setMana(discord_id, user.mana + DAILY_INCOME.mana)
    user_db.setDaily(discord_id, dailyTime())
    user_db.close()
    return {
      success: true,
      jewels_obtained: DAILY_INCOME.jewels,
      mana_obtained: DAILY_INCOME.mana
    }
  }
  
  user_db.close()
  return {
    success: false
  }
}

export default daily