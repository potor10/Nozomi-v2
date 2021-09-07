// Import Classes
import MasterDatabase from '../../../databases/master_database.js'
import ApiException from '../../../api_exception.js'

/**
 * Calculates the needed cost to level up the character bond
 * @param {Object} unit is the unit we are bonding up
 * @return {Integer} love needed to level up bond
 */
const bondCost = (unit) => {
  const master_db = new MasterDatabase()
  const love_chara_data = master_db.getLoveChara()
  master_db.close()

  const new_bond = love_chara_data[unit.bond]
  const old_bond = love_chara_data[unit.bond-1]

  if(new_bond.unlocked_class !== 1) throw new ApiException(400, 'You Have Reached Max Bond')
  if(new_bond.rarity > unit.rarity) throw new ApiException(400, 'Your Rarity Is Not Enough')
  
  const love_needed = new_bond.total_love - old_bond.total_love
  return love_needed
}

export default bondCost