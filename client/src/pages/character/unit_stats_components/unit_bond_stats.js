// Import Constants
import { NUMBER_TO_STAT, STAT_NAMES } from '../../../constants.js'

/*
 * Obtains the bond stats of a unit

*/
const unitBondStats = (component, unit) => {
  let stats = {}
  STAT_NAMES.forEach(stat => {stats[stat] = 0})

  const applicable_stories = component.state.bond_story_data.filter(story => {
    if (story.story_group_id !== unit.base_id) {
      // check applicable other units
      const other_unit = component.state.bond_characters[story.story_group_id]
      if (other_unit !== undefined) return story.love_level <= other_unit.bond
      else return false 
    }
    return story.love_level <= unit.bond
  })

  applicable_stories.forEach(story => {
    for (let i = 1; i <= 5; i++) {
      let stat = NUMBER_TO_STAT[story[`status_type_${i}`]]
      if (stat !== undefined) {
        stats[stat] += story[`status_rate_${i}`]
      }
    }
  })

  return stats
}

export default unitBondStats
