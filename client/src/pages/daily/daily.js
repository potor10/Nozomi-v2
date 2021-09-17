import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'
import Loading from '../../components/loading/loading'

import collectDaily from './collect_daily'

import ClaimFail from './claim_fail/claim_fail'
import ClaimSuccess from './claim_success/claim_success'

class Daily extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      daily_loaded: -1,
    }

    console.log(this.state.daily)
  }

  renderDaily() {
    switch (this.state.daily_loaded) {
      case -1:
        return (<Loading />)
      case 0:
        return (<p>error occ</p>)
      case 1:
        if (this.state.success) return (<ClaimSuccess {...this.state}/>)
        else return (<ClaimFail />)
    }
  }

  componentDidMount() {
    collectDaily(this, this.props.server_data.id)
  }

  render() {
    return (
      <Container 
        className="text-center d-flex justify-content-center align-items-center">
        {this.renderDaily()}
      </Container>
    )
  }
}

export default Daily