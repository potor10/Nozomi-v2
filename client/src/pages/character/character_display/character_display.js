import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'
import StarLevel from '../../../components/star_level/star_level'
import EquipmentDisplay from './equipment_display/equipment_display'
import UpgradeDisplay from './upgrade_display/upgrade_display'

import updateUnitRank from './update_unit_rank'

import styles from './character_display.module.css'
import { NUMBER_TO_EQUIP, STAT_NAMES, STAT_DISPLAY_NAMES } from '../../../constants'

class CharacterDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rank_up_available: this.checkRankUp(this.props.unit)
    }
  }

  checkRankUp(unit) {
    let rank_up_available = true
    for (let i = 1; i <= 6; i++) {
      if (unit[NUMBER_TO_EQUIP[i]] === 0) {
        rank_up_available = false
        break
      }
    }

    return rank_up_available
  }

  generateRankUpButton() {
    if (this.state.rank_up_available) {
      return (
        <Button 
          onClick={() => updateUnitRank(this)} 
          className={styles.character_rank_button, styles.character_rank_up} 
          variant="info">
          Rank Up
        </Button>
      ) 
    } else { 
      return (
        <Button 
          className={styles.character_rank_button} 
          variant="secondary" 
          disabled>
          Rank Up
        </Button>
      )
    }
  }

  componentDidUpdate() {
    const rank_up_available = this.checkRankUp(this.props.unit)
    if (rank_up_available !== this.state.rank_up_available) {
      this.setState({ rank_up_available: rank_up_available })
    }
  }

  createStatTable() {
    let stat_table = []

    for(let i = 0; i < STAT_NAMES.length; i += 2) {
      stat_table.push((
        <tr 
          key={i}>
          <td>
            {STAT_DISPLAY_NAMES[STAT_NAMES[i]]}
          </td>
          <td>
            {this.props.unit[STAT_NAMES[i]]}
          </td>
          {(i < STAT_NAMES.length) ? (
            <>
              <td>{STAT_DISPLAY_NAMES[STAT_NAMES[i+1]]}</td>
              <td>{this.props.unit[STAT_NAMES[i+1]]}</td>
            </>
          ) : ('')}
        </tr>
      ))
    }
    
    return stat_table
  }

  render() {
    let unit_profile = `/images/unit/thumb_unit_profile_` + 
      `${this.props.unit.base_id}${(this.props.unit.rarity < 3) ? 1 : 3}1.png`
    
    return (
      <Container 
        className={styles.character_wrapper}>
        <Row 
          style={{backgroundImage: `url(${unit_profile})`}} 
          className={`${styles.character_background} text-center d-flex`}>
          <Col 
            md={6} 
            style={{backgroundImage: `url(${unit_profile})`}} 
            className={styles.pad_left}/>
          <Col 
            md={6} 
            className={styles.character_data}>
            <h1 
              className={styles.character_name}>
                {this.props.unit.name}
              </h1>
            <span 
              className={styles.badge_wrapper}>
              <Badge 
                className={styles.character_rank}>
                Rank {this.props.unit.promotion_level}
              </Badge>
              <Badge 
                className={styles.character_level}>
                Lv. {this.props.unit.level}
              </Badge>
            </span>
            <span 
              className={styles.character_stars}>
              <StarLevel 
                rarity={this.props.unit.rarity} 
                max_rarity={this.props.rarity_data.length} />
            </span>
            <span 
              className={styles.character_rank_wrapper}>
              {this.generateRankUpButton()}
            </span>
            <div 
              className={styles.equipment_wrapper}>
              <EquipmentDisplay {...this.props} />
            </div>
          </Col>
        </Row>
        <UpgradeDisplay {...this.props} /> 
        <Row>
          <Col 
            className="text-center">
            <h1>
              Stats
            </h1>
            <Table 
              striped 
              bordered 
              hover 
              variant="dark">
              <tbody>
                {this.createStatTable()}
              </tbody>
            </Table>
            <Table 
              striped 
              bordered 
              hover 
              variant="dark">
              <tbody>
                <tr>
                  <td>
                    Total Power
                  </td>
                  <td>
                    {this.props.unit.total_power}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default CharacterDisplay