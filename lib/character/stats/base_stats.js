// Import Classes
import MasterDatabase from '../../databases/master_database.js'

// Import Constants
import { STAT_NAMES } from './constants/constants.js'

/**
 * Obtains the base stats of a unit
 * @param {Object} unit the object of the unit
 * @return {Object} unit base stats
 */
const baseStats = (unit) => {
  let stats = {}
  const effective_level = unit.level + unit.promotion_level

  const master_db = new MasterDatabase()
  const unit_rarity_data = master_db.getUnitRarity(unit.unit_id)

  const base_stat = unit_rarity_data[unit.rarity - 1]

  STAT_NAMES.forEach(stat => {
    stats[stat] = Math.round(base_stat[stat] + base_stat[stat + "_growth"] * effective_level)
  })

  master_db.close()
  return stats
}

export default baseStats