// Import Classes
import MasterDatabase from '../../databases/master_database.js'

// Import Functions

// Import Constants


/**
 * Obtains a random item from the normal gacha
 * @return {Object} unit object of the resulting pull
 */
const pullNormal = (discord_id, user_db) => {
  const master_db = new MasterDatabase()
  // All equipment under promotion 3 can be obtained
  const possible_equipment = master_db.getEquipmentDataUnderPromotionLevel(3)
  // All memory shards
  const possible_shards = master_db.getItemData(11)
  master_db.close()

  const pull = Math.floor(Math.random() * (possible_equipment.length + possible_shards.length))

  if (pull < possible_equipment.length) {
    return {
      item_type: 0,
      item_obtained: possible_equipment[pull]
    }
  } else {
    return {
      item_type: 1,
      item_obtained: possible_shards[pull-possible_equipment.length]
    }
  }
}

export default pullNormal