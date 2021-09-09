import PopUp from '../../../../components/popup/popup'
import FailTitle from './equip_fail/fail_title'
import FailDescription from './equip_fail/fail_description'
import removePrompt from './remove_prompt'

const createFailPrompt = (component, equip_idx) => {
  const failPrompt = (
    <PopUp 
      title={<FailTitle {...component.props} equip_idx={equip_idx} />} 
      description={<FailDescription {...component.props} equip_idx={equip_idx} />}
      hide_confirm={true}
      cancel={() => removePrompt(component)} />
  )

  component.setState({
    popup : failPrompt
  })
}

export default createFailPrompt

