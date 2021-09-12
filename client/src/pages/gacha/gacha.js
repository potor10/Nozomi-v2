import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

import pullTen from './pull_ten'
import pull from './pull'
import fetchGachaData from './fetch_gacha_data'

class Gacha extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      gacha_loaded: -1,
      user: this.props.user_stats
    }
  }

  renderGachas() {
    let gachas = []

    for(const gacha_id in this.state.current_gachas) {
      gachas.push(
        (
          <>
            <Button 
              onClick={() => pullTen(this.props.server_data.id, gacha_id)}>
              Pull x10 on {this.state.current_gachas[gacha_id].gacha_name}
            </Button>
            <Button 
              onClick={() => pull(this.props.server_data.id, gacha_id, true)}>
              Pull x1 on {this.state.current_gachas[gacha_id].gacha_name}
            </Button>
            <p 
              id='result'>
              stuff should be here
            </p>
          </>
        )
      )
    }
    return gachas
  }

  componentDidMount() {
    fetchGachaData(this)
  }

  render() {
    if (this.state.gacha_loaded===1) {
      return (
        <>
          {this.renderGachas()}
        </>
      )
    } else {
      return (<></>)
    }
  }
}

export default Gacha