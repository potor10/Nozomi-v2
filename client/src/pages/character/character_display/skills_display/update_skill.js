import skillUpUnit from "./skill_up_unit"

const updateSkill = (component, skill_info, skill_name) => {
  skillUpUnit(component, skill_name, skill_info.max)

  let user = component.props.user_stats
  user.mana -= skill_info.mana_cost
  component.props.set_user(user)

  let unit = component.props.unit
  unit[skill_name] = skill_info.new_level
  component.props.set_unit(unit)
}

export default updateSkill