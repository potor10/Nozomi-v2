// Dependencies
import { Component } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'

import styles from './popup.module.css'

class PopUp extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  hideConfirm() {
    if(this.props.hide_confirm) {
      return 
    }
    return (<Button onClick={this.props.confirm} className={styles.popup_button} variant="success">Confirm</Button>)
  }

  render() {
    return (
      <div id="popup" className={`${styles.popup} text-center d-flex justify-content-center align-items-center`}>
        <div className={styles.popup_background}>
          <div className={styles.popup_title}>{this.props.title()}</div>
          <div className={styles.popup_description}>{this.props.description()}</div>
          {this.hideConfirm()}
          <Button onClick={this.props.cancel} className={styles.popup_button} variant="danger">Cancel</Button>
        </div>
      </div>
    )
  }
}

export default PopUp