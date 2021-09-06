// Import Classes
import MasterDatabase from '../databases/master_database.js'
import ApiException from '../../../api_exception.js'

/**
 * Calculates the needed cost of ascension to the next rarity
 * @param {Object} unit is the unit we are ascending
 * @return {Object} { amulet cost, mana_cost }
 */
const ascendCost = (unit) => {
  const master_db = new MasterDatabase()
  const unit_rarity_data = master_db.getUnitRarity(unit_id)

  const max_ascension = unit_rarity_data[unit_rarity_data.length-1].rarity
  if (unit.rarity >= max_ascension) throw new ApiException(400, 'Character Is Already Max Rarity')

  const base_rarity = master_db.getUnitData(unit.unit_id).rarity

  let total_exchanged = 0
  for (let i = base_rarity + 1; i <= unit.rarity; i++) {
    total_exchanged += unit_rarity_data[i-1].consume_num
  }

  const new_rarity = unit_rarity_data[unit.rarity]
  const amulets_needed = new_rarity.consume_num
  const mana_cost = new_rarity.consume_gold

  const amulet_exchange = master_db.getShopStaticPriceGroup()
  let amulet_cost = 0

  for(let i = total_exchanged; i < total_exchanged + amulets_needed; i++) {
    const exchange_idx = Math.floor(i / 20)
    amulet_cost += amulet_exchange[(exchange_idx <= amulet_exchange.length-1) ? exchange_idx : amulet_exchange.length-1].count
  }

  master_db.close()
  return { amulet_cost: amulet_cost, mana_cost: mana_cost }
}

export default ascendCost