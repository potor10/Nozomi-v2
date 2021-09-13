

import NormalGacha from './normal_gacha/normal_gacha'
import PremiumGacha from './premium_gacha/premium_gacha'
import SpecialGacha from './special_gacha/special_gacha'
import JumpStartGacha from './jump_start_gacha/jump_start_gacha'

import createGachaPrompt from './create_gacha_prompt'

const generateGachaList = (component) => {
  let gachas = []

  for(const gacha_id in component.props.current_gachas) {
    if (component.props.current_gachas[gacha_id].pull_available !== "testabc") {

      const initPrompt = (pull_amt, discount=false) => {
        console.log('hello')
        createGachaPrompt(component, gacha_id, pull_amt, discount)
      }

      switch(component.props.current_gachas[gacha_id].type_id) {
        // Normal Gacha
        case 1:
          gachas.push((<NormalGacha {...component.props} gacha_id={gacha_id} create_prompt={initPrompt} />))
          break
        case 2:
          gachas.push((<PremiumGacha {...component.props} gacha_id={gacha_id} create_prompt={initPrompt} />))
          break
        case 6:
          gachas.push((<JumpStartGacha {...component.props} gacha_id={gacha_id} />))
          break
        default:
          gachas.push((<SpecialGacha {...component.props} gacha_id={gacha_id} />))
      }

    }
  }
  return gachas
}

export default generateGachaList