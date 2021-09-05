import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'
import StarLevel from '../../components/star_level/star_level'

import styles from './ascend_display.module.css'

class AscendDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayed_rarity: 0
    }
  }

  renderButtons() {
    if (true) {
      return (
        <div>
          <div className={styles.ascend_button_wrapper}>
            <span className={styles.ascend_text}><b>{this.props.character.max_rarity} &#9734; (MAX)</b></span>
            <Button variant="secondary" disabled className={styles.ascend_button}>
              <span className="d-flex align-items-center justify-content-center">
                &#x2715;&nbsp;<img className="icon-sm" src="/images/assets/amulet.png"/>&nbsp;
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
      <Col md={6} className="text-center">
        <h1>Ascension</h1>
        <div className={styles.star_level}>
          <StarLevel rarity={this.state.displayed_rarity} max_rarity={this.props.character.max_rarity}/>
        </div>
        {this.renderButtons()}
      </Col>
    )
  }
}

export default AscendDisplay
