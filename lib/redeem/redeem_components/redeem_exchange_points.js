// Import Classes
import UserDatabase from '../../databases/user_database.js'

const redeemExchangePoints = (code, discord_id, server_id) => {
  const user_db = new UserDatabase(server_id)
  const user = user_db.getUser(discord_id)
  user_db.setExchangePoints(discord_id, user.exchange_points + code.reward_value)
  user_db.close()
  return {
    success: true,
    exchange_points_obtained: code.reward_value
  }
}

export default redeemExchangePoints

