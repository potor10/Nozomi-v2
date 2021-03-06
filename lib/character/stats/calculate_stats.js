// Import Classes
import MasterDatabase from '../../databases/master_database.js'
import UserDatabase from '../../databases/user_database.js'
import CollectionDatabase from '../../databases/collection_database.js'

// Import Functions
import baseStats from './stats_components/base_stats.js'
import promotionStats from './stats_components/promotion_stats.js'
import equipStats from './stats_components/equip_stats.js'
import bondStats from './stats_components/bond_stats.js'
import exStats from './stats_components/ex_stats.js'

// Import Constants
import { STAT_NAMES, SKILL_NAMES } from '../../constants.js'

/**
 * Obtains the overall stats of a unit
 * @param {String} discord_id the discord id of the user
 * @param {String} server_id the server id of the request
 * @param {Integer} the unit id of the user
 * @return {Object} unit stats
 */
const calculateStats = (discord_id, server_id, unit_id) => {
  let stats = {}
  let power = 0

  const master_db = new MasterDatabase()
  const user_db = new UserDatabase(server_id)
  const collection_db = new CollectionDatabase(server_id)

  const user = user_db.getUser(discord_id)
  const unit = collection_db.getUnit(discord_id, unit_id)

  const base_stats = baseStats(unit, master_db)
  const promotion_stats = promotionStats(unit, master_db)
  const equipment_stats = equipStats(unit, master_db)
  const bond_stats = bondStats(unit, discord_id, master_db, collection_db)

  const weights = master_db.getUnitStatusCoefficient()
  
  STAT_NAMES.forEach(stat => {
    const stat_value = base_stats[stat] + promotion_stats[stat] + equipment_stats[stat] + bond_stats[stat]
    stats[stat] = stat_value
    power += stat_value * weights[stat + "_coefficient"] 
  })
  
  power = Math.round(power)

  let sum_skills = unit[SKILL_NAMES[0]] + unit[SKILL_NAMES[1]] + unit[SKILL_NAMES[2]]

  power += weights.skill_lv_coefficient * sum_skills;

  if (unit.rarity >= 5) {
    power += 150
    power += weights.exskill_evolution_coefficient * unit[SKILL_NAMES[3]]
  } else if (unit.rarity >= 6) {
    power += 2000;
    power += 5 * unit[SKILL_NAMES[0]]
    power += weights.exskill_evolution_coefficient * unit[SKILL_NAMES[3]]
  } else {
    power += weights.skill_lv_coefficient * unit[SKILL_NAMES[3]]
  }

  const ex_stats = exStats(unit, master_db)
  STAT_NAMES.forEach(stat => {
    stats[stat] += ex_stats[stat]
  })

  // update our unit's stats
  collection_db.setStats(discord_id, unit_id, stats)
  collection_db.setTotalPower(discord_id, unit_id, power)

  // update our user power
  const delta_power = power - unit.total_power
  user_db.setTotalPower(discord_id, user.total_power + delta_power)

  master_db.close()
  user_db.close()
  collection_db.close()
  return stats
}

export default calculateStats