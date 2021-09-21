// Import Classes
import MasterDatabase from '../../databases/master_database.js'
import UserDatabase from '../../databases/user_database.js'

// Import Functions
import checkExist from '../../gacha/gacha_components/check_exist.js'

// Import Constants
import { AMULET_CONVERT } from '../../constants.js'

const redeemCharacter = (code, discord_id, server_id) => {
  const master_db = new MasterDatabase()
  const user_db = new UserDatabase(server_id)
  let obtained_unit = master_db.getUnitData(code.reward_value)
  const user = user_db.getUser(discord_id)

  obtained_unit.dupe = checkExist(discord_id, server_id, obtained_unit, user, user_db)
  master_db.close()
  user_db.close()
  return {
    success: true,
    obtained_unit: obtained_unit,
    amulets_obtained: (obtained_unit.dupe) ? AMULET_CONVERT[obtained_unit.rarity-1] : 0
  }
}

export default redeemCharacter

