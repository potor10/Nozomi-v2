import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'
import StarLevel from '../../../../../../../../components/star_level/star_level'
import Loading from '../../../../../../../../components/loading/loading'

import styles from './ascend_display.module.css'

class AscendDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayed_rarity: this.props.character.rarity,
      ascend_cost_amulet: 0,
      ascend_cost_mana: 0,
      ascend_cost_loaded: -1
    }
  }

  setDisplayedRarity(rarity) {
    this.setState({ displayed_rarity: rarity })
  }

  async getAscendCost() {
    const fetch_options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }

    if (this.props.character.rarity < this.props.character.max_rarity) {  
      const ascend_cost_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/` + 
        `collection/characters/ascend/cost/${this.props.server_data.id}/${this.props.character.unit_id}`, fetch_options)
      if (ascend_cost_res.status === 200) {
        const ascend_cost = await ascend_cost_res.json()
        this.setState({ 
          ascend_cost_amulet: ascend_cost.amulet_cost,
          ascend_cost_mana: ascend_cost.mana_cost, 
          ascend_cost_loaded: 1
        })
      } else {

      }
    } else {
      this.setState({ ascend_cost_loaded: 1 })
    }
  }

  async ascend(max) {
    let mana_cost = this.state.ascend_cost_mana
    let amulet_cost = this.state.ascend_cost_amulet
    if (this.props.user_stats.mana >= mana_cost && this.props.user_stats.amulets >= amulet_cost) {
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
          unit_id: this.props.character.unit_id
        })
      }

      const res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/collection/characters/ascend`, fetch_options)

      if (res.status === 200) {
        const result = await res.json()
        if (result.success) {
          await this.props.reload_character()
          await this.props.reload_user() 
          this.setDisplayedRarity(this.props.character.rarity)
          if (this.props.character.rarity < this.props.character.max_rarity) {
            await this.getAscendCost()
          }
        } else {

        }
      } else {

      }
    }
  }

  componentDidMount() {
    this.getAscendCost()
  }

  renderButtons() {
    let can_buy_ascend = (this.props.user_stats.mana >= this.state.ascend_cost_mana &&
      this.props.user_stats.amulets >= this.state.ascend_cost_amulet)

    if (this.props.character.rarity < this.props.character.max_rarity) {
      return (
        <div>
          <div className={styles.ascend_button_wrapper}>
            <span className={styles.ascend_text}>
              <b>{this.state.displayed_rarity}</b><span> &#9734; </span> 
              <b>{(this.state.displayed_rarity === this.props.character.max_rarity) ? ('(MAX)') : ('')}</b>
            </span>
            <Button onClick={() => this.ascend()} 
              onMouseEnter={() => this.setDisplayedRarity(this.props.character.rarity + 1)}
              onMouseLeave={() => this.setDisplayedRarity(this.props.character.rarity)}
              variant={(can_buy_ascend) ? "info" : "secondary"}
              disabled={!can_buy_ascend} 
              className={[styles.ascend_button, (can_buy_ascend) ? (styles.ascend_button_active) : (undefined)]}>
              <span className="d-flex align-items-center justify-content-center">
                {this.state.ascend_cost_amulet}&nbsp;<img className="icon-sm" src="/images/assets/amulet.png"/>&nbsp;
                {this.state.ascend_cost_mana}&nbsp;<img className="icon-sm" src="/images/assets/mana.png"/>
              </span>
            </Button>
          </div>
        </div>
      )
    } else {
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

  renderAscendLoad() {
    switch(this.state.ascend_cost_loaded) {
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
        <h1>Ascension</h1>
        <div className={styles.star_level}>
          <StarLevel rarity={this.state.displayed_rarity} max_rarity={this.props.character.max_rarity}/>
        </div>
        {this.renderAscendLoad()}
      </Col>
    )
  }
}

export default AscendDisplay
