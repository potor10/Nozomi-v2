// Import Classes
import UserDatabase from '../databases/user_database.js'
import CollectionDatabase from '../../databases/collection_database.js'
import ApiException from '../../api_exception.js'

// Import Functions
import equipCost from './components/equip_cost'

// Import Constants
import { EQUIP_SLOT_PREFIX } from './constants/constants.js'

/**
 * Equips the selected equipment
 * @param {String} discord_id discord id of the user 
 * @param {String} server_id server id of the request
 * @param {Integer} unit_id unit to upgrade
 * @param {Integer} equip_idx the index of the equipment we are equipping
 * @return {boolean} state of the request
 */
const equip = (discord_id, server_id, unit_id, equip_idx) => {
  const user_db = new UserDatabase(server_id)
  const collection_db = new CollectionDatabase(server_id)
  
  const unit = collection_db.getUnit(discord_id, unit_id)
  const user = user_db.getUser(discord_id)

  const equipment_cost = equipCost(unit, equip_idx)

  if (unit[EQUIP_SLOT_PREFIX+equip_idx] === 1) throw new ApiException(400, 'The Equipment Is Already Equipped!')

  if (user.jewels < equipment_cost) throw new ApiException(400, 'You do not have enough jewels')

  user_db.setJewels(discord_id, user.jewels - equipment_cost)
  
  const equip = {[EQUIP_SLOT_PREFIX+equip_idx] : 1}
  collection_db.setEquip(discord_id, unit_id, equip)

  user_db.close()
  collection_db.close()
  return true
}

export default equip