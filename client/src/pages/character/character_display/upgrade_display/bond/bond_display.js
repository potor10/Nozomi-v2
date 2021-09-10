import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'

import getBondCost from './get_bond_cost'
import updateBond from './update_bond'

import styles from './bond_display.module.css'

class BondDisplay extends Component {
  constructor(props) {
    super(props)
  }


  componentDidMount() {
  }

  renderButton() {
    let bond_info = getBondCost(this)

    if (bond_info.bond_up_available) {
      return (
        <div>
          <div className={styles.ascend_button_wrapper}>
            <span className={styles.ascend_text}>
              <b>{this.props.unit.bond}</b> 
            </span>
            <Button onClick={() => updateBond(this, bond_info)} 
              variant={(bond_info.can_buy_bond) ? "info" : "secondary"}
              disabled={!bond_info.can_buy_bond} 
              className={[styles.ascend_button, (bond_info.can_buy_bond) ? (styles.ascend_button_active) : (undefined)]}>
              <span className="d-flex align-items-center justify-content-center">
                {bond_info.jewel_cost}&nbsp;<img className="icon-sm" src="/images/assets/jewel.png"/>
              </span>
            </Button>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className={styles.ascend_button_wrapper}>
            <span className={styles.ascend_text}><b>{this.props.unit.bond} &#9734; (MAX)</b></span>
            <Button variant="secondary" disabled className={styles.ascend_button}>
              <span className="d-flex align-items-center justify-content-center">
                &#x2715;&nbsp;<img className="icon-sm" src="/images/assets/jewel.png"/>&nbsp;
                &#x2715;&nbsp;<img className="icon-sm" src="/images/assets/mana.png"/>
              </span>
            </Button>
          </div>
          <small className={styles.blurb}>You Have Reached Max Ascension</small>
        </div>
      )
    }
  }

  render() {
    return (
      <Col md={12} className="text-center">
        <h1>Bond Level</h1>
        {this.renderButton()}
      </Col>
    )
  }
}

export default BondDisplay
