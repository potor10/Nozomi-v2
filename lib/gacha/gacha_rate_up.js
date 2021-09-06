// Import Classes
import MasterDatabase from '../databases/master_database.js'

/**
 * Obtains the rate up characters in the current rate up gacha
 * @param {Integer} exchange_id current exchange id of the rate up rotation
 * @param {Integer} rarity the rarity to sort for
 * @return {Array} array of objects with unit_id as key
 */
const gachaRateUp = (exchange_id, rarity) => {
  const master_db = new MasterDatabase()
  const gacha_exchange_lineup_data = master_db.getGachaExchangeLineup(exchange_id, rarity)
  master_db.close()

  let gacha_rate_up = {}

  // Apply the key of gacha id to the object
  gacha_exchange_lineup_data.forEach(unit => {
    if (unit.rarity === rarity) {
      gacha_rate_up[unit.unit_id] = unit
    }
  })

  return gacha_rate_up
}

export default gachaRateUp
