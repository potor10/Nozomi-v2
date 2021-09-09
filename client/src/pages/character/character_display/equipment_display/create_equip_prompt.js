import PopUp from '../../../../components/popup/popup'
import PromptTitle from './equip_prompt/prompt_title'
import PromptDescription from './equip_prompt/prompt_description'
import equipEquipment from './equip_equipment'
import createFailPrompt from './create_fail_prompt'
import removePrompt from './remove_prompt'

const createEquipmentPrompt = (component, equip_idx) => {
  const equip_id = component.props.promotion_data[component.props.unit.promotion_level-1][`equip_slot_${equip_idx}`]
  console.log(equip_id)
  const price = component.props.equipment_enhance_data[equip_id].total_point

  let confirm = () => {
    equipEquipment(component.props.server_data.id, component.props.unit.unit_id, equip_idx)

    let user = component.props.user 
    user.jewels -= price
    component.props.set_user(user)

    let unit = component.props.unit
    unit[`equip_slot_${equip_idx}`] = 1
    component.props.set_unit(unit)
    
    removePrompt(component)
  }

  if (component.props.user.jewels < price) {
    confirm = () => {
      createFailPrompt(component, equip_idx)
    }
  }

  const equipmentPrompt = (
    <PopUp 
      title={<PromptTitle {...component.props} equip_idx={equip_idx}/>} 
      description={<PromptDescription {...component.props} equip_idx={equip_idx}/>}
      confirm={confirm}
      cancel={() => removePrompt(component)} />
  )

  component.setState({
    popup : equipmentPrompt
  })
}

export default createEquipmentPrompt