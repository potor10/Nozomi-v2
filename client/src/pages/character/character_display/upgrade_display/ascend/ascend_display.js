import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'
import StarLevel from '../../../../../components/star_level/star_level'
import Loading from '../../../../../components/loading/loading'

import getAscendCost from './get_ascend_cost'

import updateAscend from './update_ascend'

import styles from './ascend_display.module.css'

class AscendDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayed_rarity: this.props.unit.rarity,
    }
  }

  setDisplayedRarity(rarity) {
    this.setState({ displayed_rarity: rarity })
  }

  componentDidMount() {
  }

  renderButton() {
    let ascend_info = getAscendCost(this)

    if (ascend_info.ascend_available) {
      return (
        <div>
          <div className={styles.ascend_button_wrapper}>
            <span className={styles.ascend_text}>
              <b>{this.state.displayed_rarity}</b><span> &#9734; </span> 
              <b>{(this.state.displayed_rarity === this.props.rarity_data.length) ? ('(MAX)') : ('')}</b>
            </span>
            <Button onClick={() => updateAscend(this, ascend_info)} 
              onMouseEnter={() => this.setDisplayedRarity(this.props.unit.rarity + 1)}
              onMouseLeave={() => this.setDisplayedRarity(this.props.unit.rarity)}
              variant={(ascend_info.can_buy_ascend) ? "info" : "secondary"}
              disabled={!ascend_info.can_buy_ascend} 
              className={[styles.ascend_button, (ascend_info.can_buy_ascend) ? (styles.ascend_button_active) : (undefined)]}>
              <span className="d-flex align-items-center justify-content-center">
                {ascend_info.amulet_cost}&nbsp;<img className="icon-sm" src="/images/assets/amulet.png"/>&nbsp;
                {ascend_info.mana_cost}&nbsp;<img className="icon-sm" src="/images/assets/mana.png"/>
              </span>
            </Button>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className={styles.ascend_button_wrapper}>
            <span className={styles.ascend_text}><b>{this.props.rarity_data.length} &#9734; (MAX)</b></span>
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
      <>
        <h1>Ascension</h1>
        <div className={styles.star_level}>
          <StarLevel rarity={this.state.displayed_rarity} max_rarity={this.props.rarity_data.length}/>
        </div>
        {this.renderButton()}
      </>
    )
  }
}

export default AscendDisplay
