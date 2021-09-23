import React, { Component } from 'react'
import Loading from '../../components/loading/loading'
import SupportDisplay from './support_display/support_display'
import fetchTickets from './fetch_tickets'

class Support extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      tickets_loaded: -1,
    }
  }

  renderSupport() {
    switch (this.state.tickets_loaded) {
      case -1:
        return (
          <Loading />
        )
      case 0:
        return (
          <p>
            an error occured while loading tickets
          </p>
        )
      case 1:
        return (
          <SupportDisplay {...this.state} {...this.props} />
        )
    }
  }

  
  componentDidMount () {
    console.log('awesome')
    fetchTickets(this)
  }

  render() {
    return (
      <>
        {this.renderSupport()}
      </>
    )
  }
}

export default Support