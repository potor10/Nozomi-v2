// Import Classes
import MasterDatabase from '../databases/master_database.js'
import ApiException from '../api_exception.js'

// Import Functions
import currentTime from '../time/current_time.js'


/**
 * Obtains the current data of gachas in rotation
 * @return {Array} array of objects with gacha_id as key
 */
const gachaData = () => {
  const master_db = new MasterDatabase()

  const current_time = currentTime()
  const db_data = master_db.getGachaData(current_time)
  master_db.close()

  if (db_data.length === 0) {
    throw new ApiException(400, 'No Current Gacha In Rotation')
  }

  let gacha_data = {}

  // Apply the key of gacha id to the object
  db_data.forEach(gacha => {
    gacha_data[gacha.gacha_id] = gacha
  })

  return gacha_data
}

export default gachaData
