// Import Classes
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
  const gacha_db = new GachaDatabase(server_id)

  const current_time = currentTime()
  const gacha_data = master_db.getGachaData(current_time)
  master_db.close()

  if (gacha_data.length === 0) {
    throw new ApiException(400, 'No Current Gacha In Rotation')
  }

  let gachas = {}

  // Apply the key of gacha id to the object
  gacha_data.forEach(gacha => {
    const type_id = parseInt((''+gacha.gacha_id).charAt(0))

    const user_gacha = gacha_db.getGacha(discord_id, gacha.gacha_id)

    let discount_available = true
    if (user_gacha.last_discount === dailyTime()) {
      discount_available = false
    }

    let pull_available = true 
    if (type_id === 1) {
      if (user_gacha.last_pull === normalResetTime()) pull_available = false
    } else if (type_id === 6) {
      if (user_gacha.last_pull !== null) pull_available = false
    }

    gachas[gacha.gacha_id] = gacha
    // Set an differentiator betwen different gacha types (rate up, standard premium, x2 3* etc)
    gachas[gacha.gacha_id].type_id = type_id

    gachas[gacha.gacha_id].discount_available = discount_available
    gachas[gacha.gacha_id].pull_available = pull_available
  })

  return gachas
}

export default gachaData
