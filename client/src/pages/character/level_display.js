import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'
import Loading from '../../components/loading/loading'

import styles from './level_display.module.css'

class LevelDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      level_cost: 0,
      level_max_cost: 0,
      level_cost_loaded: -1
    }
  }

  async getLevelCost() {
    const fetch_options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }
  
    const level_cost_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/` + 
      `collection/characters/level/cost/${this.props.server_data.id}/${this.props.character.unit_id}`, fetch_options)
    const level_max_cost_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/` + 
      `collection/characters/level/max_cost/${this.props.server_data.id}/${this.props.character.unit_id}`, fetch_options)
    if (level_cost_res.status === 200 && level_max_cost_res.status ===200) {
      const level_cost = await level_cost_res.json()
      const level_max_cost = await level_max_cost_res.json()
      this.setState({ 
        level_cost: level_cost, 
        level_max_cost: level_max_cost,
        level_cost_loaded: 1
      })
    } else {
      this.setState({ level_cost_loaded: 0 })
    }
  }

  async levelUp(max) {
    let mana_cost = this.state.level_cost
    if (max) {
      mana_cost = this.state.level_max_cost
    } 

    if (this.props.user_stats.mana >= mana_cost) {
      const fetch_options = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          server_id: this.props.server_data.id,
          unit_id: this.props.character.unit_id,
          max: max 
        })
      }

      const res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/collection/characters/level/level_up`, fetch_options)

      if (res.status === 200) {
        const result = await res.json()
        if (result.success) {
          await this.props.reload_character()
          await this.props.reload_user() 
          await this.getLevelCost()
        } else {

        }
      } else {

      }
    }
  }

  componentDidMount() {
    this.getLevelCost()
  }

  renderButtons() {
    let can_buy_level = this.props.user_stats.mana >= this.state.level_cost
    let can_buy_max = this.props.user_stats.mana >= this.state.level_max_cost

    if (this.props.character.level < this.props.user_stats.level) {
      return (
        <>
          <div className={styles.level_button_wrapper}>
            <span className={styles.level_text}>
              Lv. <b>{this.props.character.level}</b> &#8250; Lv. <b>{this.props.character.level + 1}</b>
            </span>
            <Button onClick={() => this.levelUp(false)} variant={(can_buy_level) ? "info" : "secondary"}
              disabled={!can_buy_level} 
              className={[styles.level_button, (can_buy_level) ? (styles.level_button_active) : (undefined)]}>
              <span className="d-flex align-items-center justify-content-center">
                {this.state.level_cost}&nbsp;<img className="icon-sm" src="/images/assets/mana.png"/>
              </span>
            </Button>
          </div>
          <div className={styles.level_button_wrapper}>
            <span className={styles.level_text}>
              Lv. <b>{this.props.character.level}</b> &#8250; Lv. <b>{this.props.user_stats.level} (MAX)</b>
            </span>
            <Button onClick={() => this.levelUp(true)} variant={(can_buy_max) ? "info" : "secondary"}
              disabled={!can_buy_max} 
              className={[styles.level_button, (can_buy_level) ? (styles.level_button_active) : (undefined)]}>
              <span className="d-flex align-items-center justify-content-center">
                {this.state.level_max_cost}&nbsp;<img className="icon-sm" src="/images/assets/mana.png"/>
              </span>
            </Button>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className={styles.level_button_wrapper}>
            <span className={styles.level_text}>Lv. <b>{this.props.character.level} (MAX)</b></span>
            <Button variant="secondary" disabled className={styles.level_button}>
              <span className="d-flex align-items-center justify-content-center">
                &#x2715;&nbsp;<img className="icon-sm" src="/images/assets/mana.png"/>
              </span>
            </Button>
          </div>
          <div className={styles.level_button_wrapper}>
            <span className={styles.level_text}>Lv. <b>{this.props.character.level} (MAX)</b></span>
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

  renderLevelLoad() {
    switch(this.state.level_cost_loaded) {
      case -1:
        return(<Loading />)
      case 0:
        return(<p>An Error Occurred</p>)
      case 1:
        return(this.renderButtons())
    }
  }

  render() {
    return (
      <Col md={6} className="text-center">
        <h1>Level {this.props.character.level}</h1>
        <small>Account Level {this.props.user_stats.level}</small>
        <div>
          {this.renderLevelLoad()}
        </div>
      </Col>
    )
  }
}

export default LevelDisplay
