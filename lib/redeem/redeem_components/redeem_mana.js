// Import Classes
import UserDatabase from '../../databases/user_database.js'

const redeemMana = (code, discord_id, server_id) => {
  const user_db = new UserDatabase(server_id)
  const user = user_db.getUser(discord_id)
  user_db.setMana(discord_id, user.mana + code.reward_value)

  return {
    success: true,
    mana_obtained: code.reward_value
  }
}

export default redeemMana

