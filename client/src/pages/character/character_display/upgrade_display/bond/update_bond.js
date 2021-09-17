import bondUpUnit from "./bond_up_unit"

const updateBond = (component, bond_info) => {
  bondUpUnit(component)

  let user = component.props.user_stats 
  user.jewels -= bond_info.jewel_cost
  component.props.set_user(user)

  let unit = component.props.unit
  unit.bond = bond_info.new_level
  component.props.set_unit(unit)
}

export default updateBond