import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'
import Loading from '../../components/loading/loading'

import styles from './daily.module.css'

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
  
    const res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/account/daily/${this.props.server_data.id}`, fetch_options)
    if (res.status === 200 && (await res.json()).success) {
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
        return (
          <Row className="d-flex justify-content-center align-items-center">
            <img className={styles.character_image} src="/images/nozomi_determined.png"/>
            <p>You Have Already Claimed Today!</p>
            <small>Please Come Again Tomorrow At <b>13:00 UTC</b></small>
          </Row>
        )
      case 1:
        return (
          <Row className="d-flex justify-content-center align-items-center">
              <img className={styles.character_image} src="/images/nozomi_happy.png"/>
              <p>Successfully Claimed Daily Bonus!</p>
              <small>
                You Have Earned <b>300000
                  <img className={styles.icon} src="images/assets/mana.png" /></b> and <b>1500
                  <img className={styles.icon} src="images/assets/jewel.png" /></b> 
              </small>
          </Row>
        )
    }
  }

  componentDidMount() {
    this.getDaily()
  }

  render() {
    return (
      <Container className="text-center d-flex justify-content-center align-items-center">
        {this.dailySwitch()}
      </Container>
    )
  }
}

export default Daily