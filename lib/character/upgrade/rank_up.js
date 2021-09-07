// Import Classes
import MasterDatabase from '../../databases/master_database.js'
import UserDatabase from '../../databases/user_database.js'
import CollectionDatabase from '../../databases/collection_database.js'
import ApiException from '../../api_exception.js'

// Import Functions
import skillUp from './skill_up.js'
import calculateStats from '../stats/calculate_stats.js'

// Import Constants
import { EQUIP_SLOT_PREFIX, NUMBER_TO_SKILL } from '../../constants/constants.js'

/**
 * Ranks up the unit
 * @param {String} discord_id discord id of the user 
 * @param {String} server_id server id of the request
 * @param {Integer} unit_id unit to upgrade
 * @return {boolean} state of the request
 */
const rankUp = (discord_id, server_id, unit_id) => {
  const master_db = new MasterDatabase()
  const user_db = new UserDatabase(server_id)
  const collection_db = new CollectionDatabase(server_id)

  const unit = collection_db.getUnit(discord_id, unit_id)

  let equipped_all = true
  for (let i = 1; i <= 6; i++) {
    if (unit[EQUIP_SLOT_PREFIX+i] !== 1) {
      equipped_all = false
      break
    }
  }

  if (!equipped_all) throw new ApiException(400, 'ERROR: You Must Equip All Before Ranking Up')

  const new_promotion_level = unit.promotion_level + 1
  collection_db.setPromotionLevel(discord_id, unit_id, new_promotion_level)

  const new_equip = {}
  for (let i = 1; i <= 6; i++) { new_equip[EQUIP_SLOT_PREFIX+i] = 0 }
  collection_db.setEquip(discord_id, unit_id, new_equip)

  const skill_unlock = master_db.getUnlockSkillData()
  skill_unlock.forEach(unlock => {
    if (unlock.promotion_level === new_promotion_level) {
      // level up the newly unlocked skill from 0 > 1 (not max)
      skillUp(discord_id, server_id, unit_id, NUMBER_TO_SKILL[unlock.unlock_skill], false)
    }
  })
  
  user_db.close()
  collection_db.close()
  calculateStats(discord_id, server_id, unit_id)
  return true
}

export default rankUp