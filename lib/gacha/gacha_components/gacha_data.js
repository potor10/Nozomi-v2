// Import Classes
import MasterDatabase from '../../databases/master_database.js'
import ApiException from '../../api_exception.js'

// Import Functions
import currentTime from '../../time/current_time.js'


/**
 * Obtains the current data of gachas in rotation
 * @return {Array} array of objects with gacha_id as key
 */
const gachaData = () => {
  const master_db = new MasterDatabase()

  const current_time = currentTime()
  const gacha_data = master_db.getGachaData(current_time)
  master_db.close()

  if (gacha_data.length === 0) {
    throw new ApiException(400, 'No Current Gacha In Rotation')
  }

  let gachas = {}

  // Apply the key of gacha id to the object
  gacha_data.forEach(gacha => {
    gachas[gacha.gacha_id] = gacha
  })

  return gachas
}

export default gachaData
