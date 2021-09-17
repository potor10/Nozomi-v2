import createExchangePrompt from "./create_exchange_prompt"

import getUnitIconUrl from "../../../lib/url/get_unit_icon_url"

const generateExchangeList = (component) => {
  let exchanges = []

  for(const unit_id in component.props.current_exchanges) {
    // render the exchange
    exchanges.push((
      <div key={"exchange"+unit_id}>
        <span className="me-auto">
        <img src={getUnitIconUrl(component.props.current_exchanges[unit_id])} />
        <small>Exchange for {component.props.current_exchanges[unit_id].unit_name}</small>
        </span>
        <button onClick={()=>{createExchangePrompt(component, unit_id)}}>
          awesome
        </button>
      </div>
    ))
  }

  return exchanges
}

export default generateExchangeList