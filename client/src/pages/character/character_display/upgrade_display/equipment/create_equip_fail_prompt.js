import PopUp from '../../../../../components/popup/popup'
import EquipFailTitle from './equip_fail/equip_fail_title'
import EquipFailDescription from './equip_fail/equip_fail_description'
import removeEquipmentPrompt from './remove_equipment_prompt'

const createEquipFailPrompt = (component, equip_idx) => {
  const fail_prompt = (
    <PopUp 
      title={<EquipFailTitle {...component.props} equip_idx={equip_idx} />} 
      description={<EquipFailDescription {...component.props} equip_idx={equip_idx} />}
      hide_confirm
      cancel={() => removeEquipmentPrompt(component)} />
  )

  component.setState({
    popup : fail_prompt
  })
}

export default createEquipFailPrompt

