import { Component } from "react"
import { Container, Row } from 'react-bootstrap'
import styles from './claim_fail.module.css'

class ClaimFail extends Component {
  render() {
    return (
      <Row className="d-flex justify-content-center align-items-center">
        <img className={styles.character_image} src="/images/nozomi_determined.png"/>
        <p>You Have Already Claimed Today!</p>
        <small>Please Come Again Tomorrow At <b>13:00 UTC</b></small>
      </Row>
    )
  }
}

export default ClaimFail