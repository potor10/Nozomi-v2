// Import Classes
import UserDatabase from '../../databases/user_database.js'

const redeemJewels = (code, discord_id, server_id) => {
  const user_db = new UserDatabase(server_id)
  const user = user_db.getUser(discord_id)
  user_db.setJewels(discord_id, user.jewels + code.reward_value)
  user_db.close()
  return {
    success: true,
    jewels_obtained: code.reward_value
  }
}

export default redeemJewels

