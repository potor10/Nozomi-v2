// Import Classes
import UserDatabase from '../../databases/user_database.js'

const redeemAmulets = (code, discord_id, server_id) => {
  const user_db = new UserDatabase(server_id)
  const user = user_db.getUser(discord_id)
  user_db.setAmulets(discord_id, user.amulets + code.reward_value)
  user_db.close()
  return {
    success: true,
    amulets_obtained: code.reward_value
  }
}

export default redeemAmulets

