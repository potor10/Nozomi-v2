// Import Classes
import MasterDatabase from '../../databases/master_database.js'
import ApiException from '../../api_exception.js'

// Import Functions
import currentTime from '../../time/current_time.js'

/**
 * Obtains the units able to be pulled in current gacha roatation
 * @param {Integer} rarity the rarity to sort for
 * @return {Array} array of unit objects with unit_id as key
 */
const gachaUnits = (rarity) => {
  const master_db = new MasterDatabase()
  
  const current_time = currentTime()
  let gacha_units_data = master_db.getGachaUnits(rarity, current_time)
  master_db.close()

  if (gacha_units_data.length === 0) {
    throw new ApiException(400, 'No Units Available In Gacha')
  }

  let gacha_units = {}

  // Apply the key of gacha id to the object
  gacha_units_data.forEach(unit => {
    gacha_units[unit.unit_id] = unit
  })

  return gacha_units
}

export default gachaUnits
