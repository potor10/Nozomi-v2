// Import Functions
import unitBaseStats from './unit_stats_components/unit_base_stats.js'
import unitPromotionStats from './unit_stats_components/unit_promotion_stats.js'
import unitEquipStats from './unit_stats_components/unit_equip_stats.js'
import unitBondStats from './unit_stats_components/unit_bond_stats.js'
import unitExStats from './unit_stats_components/unit_ex_stats.js'

// Import Constants
import { STAT_NAMES, SKILL_NAMES } from '../../constants.js'

/**
 */
const unitStats = (component, unit) => {
  let stats = {}
  let power = 0

  const base_stats = unitBaseStats(component, unit)
  const promotion_stats = unitPromotionStats(component, unit)
  const equipment_stats = unitEquipStats(component, unit)
  const bond_stats = unitBondStats(component, unit)

  console.log(component.state)
  const weights = component.state.unit_status_coefficient_data
  
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

  const ex_stats = unitExStats(component, unit)
  STAT_NAMES.forEach(stat => {
    stats[stat] += ex_stats[stat]
  })

  // update our unit's stats
  STAT_NAMES.forEach(stat => {
    unit[stat] = stats[stat]
  })

  unit.total_power = power

  component.setState({ 
    unit: unit
  })
}

export default unitStats