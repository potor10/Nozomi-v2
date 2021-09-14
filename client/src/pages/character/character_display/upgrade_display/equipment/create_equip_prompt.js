import PopUp from '../../../../../components/popup/popup'
import EquipPromptTitle from './equip_prompt/equip_prompt_title'
import EquipPromptDescription from './equip_prompt/equip_prompt_description'

import equipEquipment from './equip_equipment'
import createEquipFailPrompt from './create_equip_fail_prompt'
import removeEquipmentPrompt from './remove_equipment_prompt'

const createEquipmentPrompt = (component, equip_idx) => {
  const equip_id = component.props.promotion_data[component.props.unit.promotion_level-1][`equip_slot_${equip_idx}`]
  console.log(equip_id)
  const price = component.props.equipment_enhance_data[equip_id].total_point

  let confirm = () => {
    equipEquipment(component, equip_idx)

    let user = component.props.user 
    user.jewels -= price
    component.props.set_user(user)

    let unit = component.props.unit
    unit[`equip_slot_${equip_idx}`] = 1
    component.props.set_unit(unit)
    
    removeEquipmentPrompt(component)
  }

  if (component.props.user.jewels < price) {
    confirm = () => {
      createEquipFailPrompt(component, equip_idx)
    }
  }

  const equipmentPrompt = (
    <PopUp 
      title={<EquipPromptTitle {...component.props} equip_idx={equip_idx}/>} 
      description={<EquipPromptDescription {...component.props} equip_idx={equip_idx}/>}
      confirm={confirm}
      cancel={() => removeEquipmentPrompt(component)} />
  )

  component.setState({
    popup : equipmentPrompt
  })
}

export default createEquipmentPrompt