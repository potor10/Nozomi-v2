import ascendUnit from "./ascend_unit"


const updateAscend = (component, ascend_info) => {
  ascendUnit(component)

  let user = component.props.user_stats
  user.mana -= ascend_info.mana_cost
  user.amulets -= ascend_info.amulet_cost
  component.props.set_user(user)

  let unit = component.props.unit
  unit.rarity += 1
  component.props.set_unit(unit)

  component.setState({ 
    displayed_rarity: unit.rarity 
  })
}

export default updateAscend