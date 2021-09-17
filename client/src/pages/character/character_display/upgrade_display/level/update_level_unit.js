import levelUpUnit from "./level_up_unit"

const updateLevelUnit = (component, level_info) => {
  levelUpUnit(component, level_info.max)

  let user = component.props.user_stats 
  user.mana -= level_info.mana_cost
  component.props.set_user(user)

  let unit = component.props.unit
  unit.level = level_info.new_level
  component.props.set_unit(unit)
}

export default updateLevelUnit