import React, { Component } from 'react'
import Loading from '../../components/loading/loading'

import fetchLeaderboard from './fetch_leaderboard'

class Leaderboard extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      leaderboard_loaded: -1,
    }
  }

  renderLeaderboard() {
    switch (this.state.leaderboard_loaded) {
      case -1:
        return (
          <Loading />
        )
      case 0:
        return (
          <p>
            an error occured while loading characters
          </p>
        )
      case 1:
        return (
          <p>{JSON.stringify(this.state.leaderboard)}</p>
        )
    }
  }

  
  componentDidMount () {
    console.log('awesome')
    fetchLeaderboard(this, this.props.server_data.id)
  }

  render() {
    return (
      <>
        <h1>leaderboad?</h1>
        {this.renderLeaderboard()}
      </>
    )
  }
}

export default Leaderboard