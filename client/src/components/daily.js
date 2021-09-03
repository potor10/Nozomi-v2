import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Loading from './loading'

class Daily extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      daily: -1,
    }

    console.log(this.state.daily)
  }

  async getDaily() {
    const fetch_options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }
  
    const res = await fetch(`${process.env.REACT_APP_WEB_URL}/account/daily/${this.props.server_data.id}`, fetch_options)
    if (res.status === 200) {
      this.setState({ daily: 1 })
    } else {
      this.setState({ daily: 0 })
    }
    
  }

  dailySwitch() {
    switch (this.state.daily) {
      case -1:
        return (<Loading />)
      case 0:
        return (<p>You Have Already Claimed Today! Come Again Tomorrow</p>)
      case 1:
        return (<p>Successfully Claimed Daily! Earned 300000 Mana and 1500 Jewels</p>)
    }
  }

  componentDidMount() {
    this.getDaily()
  }

  render() {
    return (
      <>
        {this.dailySwitch()}
      </>
    )
  }
}

export default Daily