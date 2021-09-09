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
      daily: -1,
    }

    console.log(this.state.daily)
  }

  renderDaily() {
    switch (this.state.daily) {
      case -1:
        return (
          <Loading />
        )
      case 0:
        return (
          <ClaimFail />
        )
      case 1:
        return (
          <ClaimSuccess />
        )
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