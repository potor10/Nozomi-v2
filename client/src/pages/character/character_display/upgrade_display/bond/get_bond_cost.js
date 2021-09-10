/**
 * Calculates the needed cost to level up the character bond
 */
const getBondCost = (component) => {

  const new_bond = component.props.love_chara_data[component.props.unit.bond]
  const old_bond = component.props.love_chara_data[component.props.unit.bond-1]

  if(new_bond.unlocked_class !== 1 || new_bond.rarity > component.props.unit.rarity) {
    return {
      bond_up_available: false
    } 
  }

  const love_needed = new_bond.total_love - old_bond.total_love

  const bond_info = {
    bond_up_available: true,
    can_buy_bond: component.props.user.jewels >= love_needed,
    jewel_cost: love_needed,
    new_level: new_bond.love_level
  } 

  return bond_info
}

export default getBondCost