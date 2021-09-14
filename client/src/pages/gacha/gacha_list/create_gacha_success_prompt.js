import PopUp from '../../../components/popup/popup'

import GachaSuccessTitle from './gacha_success/gacha_success_title'
import GachaSuccessDescription from './gacha_success/gacha_success_description'

import removeGachaPrompt from './remove_gacha_prompt'

const createGachaSuccessPrompt = (component, gacha_id, pull_amt, discount=false) => {
  const successPrompt = (
    <PopUp 
      title={<GachaSuccessTitle {...component.props} gacha_id={gacha_id} />} 
      description={
        <GachaSuccessDescription {...component.props} gacha_id={gacha_id} 
          pull_amt={pull_amt} discount={discount}
          remove_prompt={() => removeGachaPrompt(component)} />
      }
      hide_cancel hide_confirm />
      
  )

  component.setState({
    popup : successPrompt
  })
}

export default createGachaSuccessPrompt