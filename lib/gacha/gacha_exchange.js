// Import Classes
import MasterDatabase from '../databases/master_database.js'

/**
 * Obtains the units able to be exchanged in current gacha roatation
 * @param {Integer} exchange_id current exchange rotation
 * @param {Integer} rarity the rarity to sort for
 * @return {Array} array of objects with unit_id as key
 */
const gachaExchange = (exchange_id, rarity) => {
  const master_db = new MasterDatabase()
  const db_data = master_db.getGachaData(exchange_id, rarity)
  master_db.close()

  let gacha_exchange = {}

  // Apply the key of gacha id to the object
  db_data.forEach(unit => {
    gacha_exchange[unit.unit_id] = unit
  })

  return gacha_exchange
}

export default gachaExchange
