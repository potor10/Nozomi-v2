import PopUp from '../../../components/popup/popup'

import ExchangeSuccessTitle from './exchange_success/exchange_success_title'
import ExchangeSuccessDescription from './exchange_success/exchange_success_description'

import removeExchangePrompt from './remove_exchange_prompt'

const createExchangeSuccessPrompt = (component, unit_id) => {
  const success_prompt = (
    <PopUp 
      title={<ExchangeSuccessTitle {...component.props} exchange_unit_id={unit_id} />} 
      description={
        <ExchangeSuccessDescription {...component.props} exchange_unit_id={unit_id} 
          remove_prompt={() => removeExchangePrompt(component)} />
      }
      hide_cancel hide_confirm />
      
  )

  component.setState({
    popup : success_prompt
  })
}

export default createExchangeSuccessPrompt