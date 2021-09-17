import PopUp from '../../../components/popup/popup'
import GachaFailTitle from './gacha_fail/gacha_fail_title'
import GachaFailDescription from './gacha_fail/gacha_fail_description'
import removeGachaPrompt from './remove_gacha_prompt'

const createGachaFailPrompt = (component, gacha_id, price) => {
  const fail_prompt = (
    <PopUp 
      title={<GachaFailTitle {...component.props} gacha_id={gacha_id} />} 
      description={<GachaFailDescription {...component.props} gacha_id={gacha_id} price={price} />}
      hide_confirm
      cancel={() => removeGachaPrompt(component)} />
  )

  component.setState({
    popup : fail_prompt
  })
}

export default createGachaFailPrompt

