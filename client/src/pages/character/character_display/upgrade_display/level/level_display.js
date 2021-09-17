import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'
import Loading from '../../../../../components/loading/loading'

import getLevelUpCost from './get_level_up_cost'
import getLevelUpMaxCost from './get_level_up_max_cost'

import updateLevelUnit from './update_level_unit'

import styles from './level_display.module.css'

class LevelDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
  }

  renderButtons() {
    let level_info = getLevelUpCost(this)
    let level_max_info = getLevelUpMaxCost(this)

    if (level_info.level_up_available && level_max_info.level_up_available) {
      return (
        <>
          <div className={styles.level_button_wrapper}>
            <span className={styles.level_text}>
              Lv. <b>{this.props.unit.level}</b> &#8250; Lv. <b>{level_info.new_level}</b>
            </span>
            <Button onClick={() => updateLevelUnit(this, level_info)} 
              variant={(level_info.can_buy_level) ? "info" : "secondary"}
              disabled={!level_info.can_buy_level} 
              className={[styles.level_button, (level_info.can_buy_level) ? (styles.level_button_active) : (undefined)]}>
              <span className="d-flex align-items-center justify-content-center">
                {level_info.mana_cost}&nbsp;<img className="icon-sm" src="/images/assets/mana.png"/>
              </span>
            </Button>
          </div>
          <div className={styles.level_button_wrapper}>
            <span className={styles.level_text}>
              Lv. <b>{this.props.unit.level}</b> &#8250; Lv. <b>{level_max_info.new_level} (MAX)</b>
            </span>
            <Button onClick={() => updateLevelUnit(this, level_max_info)} variant={(level_max_info.can_buy_max) ? "info" : "secondary"}
              disabled={!level_max_info.can_buy_max} 
              className={[styles.level_button, (level_max_info.can_buy_max) ? (styles.level_button_active) : (undefined)]}>
              <span className="d-flex align-items-center justify-content-center">
                {level_max_info.mana_cost}&nbsp;<img className="icon-sm" src="/images/assets/mana.png"/>
              </span>
            </Button>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className={styles.level_button_wrapper}>
            <span className={styles.level_text}>Lv. <b>{this.props.unit.level} (MAX)</b></span>
            <Button variant="secondary" disabled className={styles.level_button}>
              <span className="d-flex align-items-center justify-content-center">
                &#x2715;&nbsp;<img className="icon-sm" src="/images/assets/mana.png"/>
              </span>
            </Button>
          </div>
          <div className={styles.level_button_wrapper}>
            <span className={styles.level_text}>Lv. <b>{this.props.unit.level} (MAX)</b></span>
            <Button variant="secondary" disabled className={styles.level_button}>
              <span className="d-flex align-items-center justify-content-center">
                &#x2715;&nbsp;<img className="icon-sm" src="/images/assets/mana.png"/>
              </span>
            </Button>
          </div>
          <small className={styles.blurb}>Increase Your Account Level To Continue Upgrading</small>
        </>
      )
    }
  }

  render() {
    return (
      <>
        <h1>Level {this.props.unit.level}</h1>
        <small>Account Level {this.props.user_stats.level}</small>
        <div>
          {this.renderButtons()}
        </div>
      </>
    )
  }
}

export default LevelDisplay
