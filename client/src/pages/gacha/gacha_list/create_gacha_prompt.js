import PopUp from '../../../components/popup/popup'
import GachaPromptTitle from './gacha_prompt/gacha_prompt_title'
import GachaPromptDescription from './gacha_prompt/gacha_prompt_description'

import createGachaFailPrompt from './create_gacha_fail_prompt'
import createGachaSuccessPrompt from './create_gacha_success_prompt'

import removeGachaPrompt from './remove_gacha_prompt'

const createGachaPrompt = (component, gacha_id, pull_amt, discount=false) => {
  console.log(pull_amt)
  console.log(discount)

  console.log(component.props.current_gachas[gacha_id].price)
  console.log(component.props.user_stats.jewels)

  // add cases for discount pull
  let price = (discount) ? component.props.current_gachas[gacha_id].discount_price : 
    component.props.current_gachas[gacha_id].price

  // x10 guarantee always 10 pull
  if (component.props.current_gachas[gacha_id].type_id !== 6) {
    price *= pull_amt
  }

  let confirmGacha = () => {
    createGachaSuccessPrompt(component, gacha_id, price, pull_amt, discount)
  }

  if (price > component.props.user_stats.jewels) {
    confirmGacha = () => {
      createGachaFailPrompt(component, gacha_id, price)
    }
  }

  console.log(pull_amt)

  const gacha_prompt = (
    <PopUp 
      title={
        <GachaPromptTitle {...component.props} gacha_id={gacha_id} />
      }
      description={
        <GachaPromptDescription {...component.props} gacha_id={gacha_id} price={price} />
      }
      confirm={confirmGacha}
      cancel={() => removeGachaPrompt(component)} />
  )

  console.log('working!')
  console.log(component.state)
  component.setState({
    popup : gacha_prompt
  })
}

export default createGachaPrompt