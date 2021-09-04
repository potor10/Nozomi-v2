import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'
import StarLevel from '../../components/star_level/star_level'
import EquipmentDisplay from './equipment_display'
import UpgradeDisplay from './upgrade_display'

import lighten from '../../lib/lighten'

import styles from './character_display.module.css'
import constants from '../constants.json'

class CharacterDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.state.unit_profile = `/images/unit/thumb_unit_profile_` + 
      `${this.props.character.base_id}${(this.props.character.rarity < 3) ? 1 : 3}1.png`

    let can_rank_up = true
    for (let i = 1; i <= 6; i++) {
      if (this.props.character[constants.NUMBER_TO_EQUIP[i]] === 0) {
        can_rank_up = false
        break
      }
    }

    this.state.can_rank_up = can_rank_up

    this.rankUp = this.rankUp.bind(this)
    this.setRankUp = this.setRankUp.bind(this)
  }

  async rankUp() {
    this.setRankUp(false)
    
    const fetch_options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }

    const res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/` + 
      `collection/equipment/rank_up/${this.props.server_data.id}/${this.props.character.unit_id}`, 
      fetch_options)
    if (res.status === 200) { 
      await this.props.reload_character()
      await this.props.reload_equipment()
    }
  }

  setRankUp(status) {
    this.setState({ can_rank_up: status })
  }

  createStatTable() {
    let stat_table = []

    for(let i = 0; i < constants.STAT_NAMES.length; i += 2) {
      stat_table.push((
        <tr key={i}>
          <td>{constants.STAT_DISPLAY_NAMES[constants.STAT_NAMES[i]]}</td>
          <td>{this.props.character[constants.STAT_NAMES[i]]}</td>
          {(i < constants.STAT_NAMES.length) ? (
            <>
              <td>{constants.STAT_DISPLAY_NAMES[constants.STAT_NAMES[i+1]]}</td>
              <td>{this.props.character[constants.STAT_NAMES[i+1]]}</td>
            </>
          ) : ('')}
        </tr>
      ))
    }
    
    return stat_table
  }

  render() {
    return (
      <Container className={styles.character_wrapper}>
        <Row style={{backgroundImage: `url(${this.state.unit_profile})`}} 
          className={`${styles.character_background} text-center d-flex`}>
          <Col md={6} style={{backgroundImage: `url(${this.state.unit_profile})`}} 
            className={styles.pad_left}/>
          <Col md={6} className={styles.character_data}>
            <h1 className={styles.character_name}>{this.props.character.name}</h1>
            <span className={styles.badge_wrapper}>
              <Badge style={{ backgroundColor: lighten('#F3C2E2', 
                -50 + (10) * this.props.character.promotion_level) }}
                className={styles.character_rank}>Rank {this.props.character.promotion_level}</Badge>
              <Badge style={{ backgroundColor: lighten('#DCC8F5', 
                -50 + this.props.character.promotion_level)}}
                className={styles.character_level}>Lv. {this.props.character.level}</Badge>
            </span>
            <span className={styles.character_stars}>
              <StarLevel rarity={this.props.character.rarity} max_rarity={this.props.character.max_rarity} />
            </span>
            <span className={styles.character_rank_wrapper}>
              {(this.state.can_rank_up) ? (
                  <Button onClick={this.rankUp} className={styles.character_rank_button, styles.character_rank_up} 
                    variant="info">Rank Up</Button>
                ) : (
                  <Button className={styles.character_rank_button} 
                    variant="secondary" disabled>Rank Up</Button>
              )}
            </span>
            <div className={styles.equipment_wrapper}>
              <EquipmentDisplay character={this.props.character} server_data={this.props.server_data} 
                equipment={this.props.equipment} rank_up={this.setRankUp} 
                reload_character={this.props.reload_character} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover variant="dark">
              <tbody>
                {this.createStatTable()}
              </tbody>
            </Table>
          </Col>
        </Row>
        <UpgradeDisplay character={this.props.character} server_data={this.props.server_data} />
      </Container>
    )
  }
}

export default CharacterDisplay