
import React, { Component } from 'react'

import getUnitIconUrl from '../../../../lib/url/get_unit_icon_url'

class ExchangeFailTitle extends Component {
  render() {
    console.log(this.props)

    return (
      <>
        <img src={getUnitIconUrl(this.props.current_exchanges[this.props.exchange_unit_id])} />
        <h1>Not Enough Points!</h1>
      </>
    )
  }
} 

export default ExchangeFailTitle