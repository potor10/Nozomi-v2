// Import Classes
import MasterDatabase from '../../databases/master_database.js'
import UserDatabase from '../../databases/user_database.js'
import CollectionDatabase from '../../databases/collection_database.js'
import ApiException from '../../api_exception.js'

// Import Functions
import bondCost from './upgrade_components/bond_cost.js'
import calculateStats from '../stats/calculate_stats.js'

/**
 * Levels up the unit bond to the next level
 * @param {String} discord_id discord id of the user 
 * @param {String} server_id server id of the request
 * @param {Integer} unit_id id of the unit to upgrade
 * @return {boolean} state of the request
 */
const bondUp = (discord_id, server_id, unit_id) => {
  const master_db = new MasterDatabase()
  const user_db = new UserDatabase(server_id)
  const collection_db = new CollectionDatabase(server_id)

  const unit = collection_db.getUnit(discord_id, unit_id)
  const user = user_db.getUser(discord_id)

  const love_needed = bondCost(unit)

  if (user.jewels < love_needed) throw new ApiException(400, 'Not Enough Jewels')
  
  user_db.setJewels(discord_id, user.jewels - love_needed)
  collection_db.setBond(discord_id, unit_id, unit.bond+1)

  calculateStats(discord_id, server_id, unit_id)

  // update stats of all other involved characters
  const bond_story_data = master_db.getBondStory(unit.base_id)
  let bond_characters = {}

  bond_story_data.forEach(story => {
    if (story.story_group_id !== unit.base_id) {
      // check applicable other units
      if (bond_characters[story.story_group_id] === undefined) {
        const other_unit = collection_db.getUnitFromBase(discord_id, story.story_group_id)
        bond_characters[other_unit.unit_id] = other_unit
      }
    }
  })

  for (const other_character_id in bond_characters) {
    calculateStats(discord_id, server_id, other_character_id)
  }
  
  master_db.close()
  user_db.close()
  collection_db.close()
  return true
}

export default bondUp