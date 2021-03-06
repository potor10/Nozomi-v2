// Import Constants
import { NUMBER_TO_STAT, STAT_NAMES } from '../../../constants.js'

/**
 * Obtains the bond stats of a unit
 * @param {Object} unit the object of the unit
 * @param {Object} discord_id the discord id of the user making the request
 * @param {MasterDatabase} master_db instance that we are using
 * @param {CollectionDatabase} collection_db instance that we are using
 * @return {Object} unit bond stats
 */
const bondStats = (unit, discord_id, master_db, collection_db) => {
  let stats = {}
  STAT_NAMES.forEach(stat => {stats[stat] = 0})

  const bond_story_data = master_db.getBondStory(unit.base_id)

  const applicable_stories = bond_story_data.filter(story => {
    if (story.story_group_id !== unit.base_id) {
      // check applicable other units
      const other_unit = collection_db.getUnitFromBase(discord_id, story.story_group_id)
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

export default bondStats