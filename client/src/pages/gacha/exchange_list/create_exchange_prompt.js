import PopUp from '../../../components/popup/popup'
import ExchangePromptTitle from './exchange_prompt/exchange_prompt_title'
import ExchangePromptDescription from './exchange_prompt/exchange_prompt_description'

import removeExchangePrompt from './remove_exchange_prompt'
import createExchangeFailPrompt from './create_exchange_fail_prompt'
import createExchangeSuccessPrompt from './create_exchange_success_prompt'

const createExchangePrompt = (component, unit_id) => {


  let confirmExchange = () => {
    // Do something
    createExchangeSuccessPrompt(component, unit_id)
  }

  if (component.props.user_stats.exchange_points < 300) {
    confirmExchange = () => {
      createExchangeFailPrompt(component, unit_id)
    }
  }


  const exchange_prompt = (
    <PopUp 
      title={
        <ExchangePromptTitle {...component.props} exchange_unit_id={unit_id} />
      }
      description={
        <ExchangePromptDescription {...component.props} exchange_unit_id={unit_id} />
      }
      confirm={confirmExchange}
      cancel={() => removeExchangePrompt(component)} />
  )


  component.setState({
    popup : exchange_prompt
  })
}

export default createExchangePrompt