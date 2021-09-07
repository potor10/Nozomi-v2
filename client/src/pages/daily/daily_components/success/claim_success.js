import { Component } from "react"
import { Container, Row } from 'react-bootstrap'
import styles from './claim_success.module.css'

class ClaimSuccess extends Component {
  render() {
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

export default ClaimSuccess