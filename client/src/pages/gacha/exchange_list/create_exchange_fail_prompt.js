import PopUp from '../../../components/popup/popup'
import ExchangeFailTitle from './exchange_fail/exchange_fail_title'
import ExchangeFailDescription from './exchange_fail/exchange_fail_description'
import removeExchangePrompt from './remove_exchange_prompt'

const createExchangeFailPrompt = (component, unit_id) => {
  const fail_prompt = (
    <PopUp 
      title={<ExchangeFailTitle {...component.props} exchange_unit_id={unit_id} />} 
      description={<ExchangeFailDescription {...component.props} exchange_unit_id={unit_id}  />}
      hide_confirm
      cancel={() => removeExchangePrompt(component)} />
  )

  component.setState({
    popup : fail_prompt
  })
}

export default createExchangeFailPrompt

