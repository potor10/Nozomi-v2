import React, { Component } from 'react'
import { Container } from 'react-bootstrap'

import fetchGachaData from './fetch_gacha_data'
import GachaList from './gacha_list/gacha_list'
import ExchangeList from './exchange_list/exchange_list'

import Loading from '../../components/loading/loading'

class Gacha extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      gacha_loaded: -1
    }
  }

  componentDidMount() {
    fetchGachaData(this)
  }

  render() {
    if (this.state.gacha_loaded===1) {
      return (
        <Container>
          <GachaList {...this.state} {...this.props} />
          <h1>EXCHANGE HERE</h1>
          <ExchangeList {...this.state} {...this.props} />
        </Container>
      )
    } else {
      return (<Loading />)
    }
  }
}

export default Gacha