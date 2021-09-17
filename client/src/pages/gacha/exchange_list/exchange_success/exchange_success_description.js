
import { Button } from 'react-bootstrap'
import React, { Component } from 'react'

import Loading from '../../../../components/loading/loading'

import exchangeUnit from './exchange_unit'

class ExchangeSuccessDescription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exchange_loaded: -1
    }
  }

  renderDescription() {
    switch (this.state.exchange_loaded) {
      case 1:
        let obtained_str = (<p>You have obtained {this.state.exchange_unit.unit_name}</p>)
        if (this.state.exchange_unit.dupe) {
          obtained_str = (<p>You have obtained {this.state.amulets_obtained}</p>)
        } 
        return (
          <>
            <h1>Exchanged For {this.props.current_exchanges[this.props.exchange_unit_id].unit_name}</h1>
            {obtained_str}
            <Button onClick={this.props.remove_prompt}>Close</Button>
          </>
        )
      case -1:
        return (<Loading />)
      case 0:
        return (
          <>
            <p>failed</p>
          </>
        )
    }
  }

  componentDidMount() {
    exchangeUnit(this, this.props.exchange_unit_id)
    console.log("MOUNTED SUCCESS!")
  }

  render() {
    console.log(this.props)

    return (
      <>
        {this.renderDescription()}
      </>
    )
  }
} 

export default ExchangeSuccessDescription