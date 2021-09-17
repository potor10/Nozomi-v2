// Import Classes
import UserDatabase from '../../databases/user_database.js'
import MasterDatabase from '../../databases/master_database.js'
import GachaDatabase from '../../databases/gacha_database.js'
import ApiException from '../../api_exception.js'

// Import Functions
import currentTime from '../../time/current_time.js'
import dailyTime from '../../time/daily_time.js'
import normalResetTime from '../../time/normal_reset_time.js'


/**
 * Obtains the current data of gachas in rotation
 * @param
 * @param
 * @return {Array} array of objects with gacha_id as key
 */
const gachaData = (discord_id, server_id) => {
  const master_db = new MasterDatabase()
  const user_db = new UserDatabase(server_id)
  const gacha_db = new GachaDatabase(server_id)

  const current_time = currentTime()
  const gacha_data = master_db.getGachaData(current_time)
  const user = user_db.getUser(discord_id)

  if (gacha_data.length === 0) {
    throw new ApiException(400, 'No Current Gacha In Rotation')
  }

  let gachas = {}
  let exchanges = {}

  // Apply the key of gacha id to the object
  gacha_data.forEach(gacha => {
    const type_id = parseInt((''+gacha.gacha_id).charAt(0))

    // Validate the user's current exchange points
    if (type_id === 2 && current_time > user.point_expiration) {
      // New gacha rotation (delete all exchange points)
      user_db.setExchangePoints(discord_id, 0)
      user_db.setPointExpiration(discord_id, gacha.end_time)
    }

    master_db.getGachaExchangeLineup(gacha.exchange_id).forEach(unit => {
      if (exchanges[unit.unit_id] === undefined) {
        exchanges[unit.unit_id] = master_db.getUnitData(unit.unit_id)
      }
    })
    
    const user_gacha = gacha_db.getGacha(discord_id, gacha.gacha_id)

    let discount_available = true
    if (user_gacha.last_discount === dailyTime()) {
      // discount_available = false
    }

    let pull_available = true 
    if (type_id === 1) {
      // if (user_gacha.last_pull === normalResetTime()) pull_available = false
    } else if (type_id === 6) {
      if (user_gacha.last_pull !== null) pull_available = false
    }

    gachas[gacha.gacha_id] = gacha
    // Set an differentiator betwen different gacha types (rate up, standard premium, x2 3* etc)
    gachas[gacha.gacha_id].type_id = type_id

    gachas[gacha.gacha_id].discount_available = discount_available
    gachas[gacha.gacha_id].pull_available = pull_available
  })

  master_db.close()
  user_db.close()
  gacha_db.close()

  return {
    gachas: gachas,
    exchanges: exchanges
  }
}

export default gachaData
