
import React, { Component } from 'react'
import getUnitIconUrl from '../../../../lib/url/get_unit_icon_url'

class ExchangePromptTitle extends Component {
  render() {
    console.log(this.props)

    return (
      <>
        <img src={getUnitIconUrl(this.props.current_exchanges[this.props.exchange_unit_id])} />
        <h1>Exchanging For {this.props.current_exchanges[this.props.exchange_unit_id].unit_name}</h1>
      </>
    )
  }
} 

export default ExchangePromptTitle