import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'
import StarLevel from '../../../components/star_level/star_level'
import EquipmentDisplay from './equipment_display/equipment_display'
import UpgradeDisplay from './upgrade_display/upgrade_display'

import styles from './character_display.module.css'
import constants from '../../constants.json'

class CharacterDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rank_up_available: this.checkRankUp(this.props.character)
    }
  }

  checkRankUp(character) {
    let rank_up_available = true
    for (let i = 1; i <= 6; i++) {
      if (character[constants.NUMBER_TO_EQUIP[i]] === 0) {
        rank_up_available = false
        break
      }
    }

    return rank_up_available
  }

  generateRankUpButton() {
    if (this.state.can_rank_up) {
      return (
        <Button 
          onClick={this.rankUp} 
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
    const rank_up_available = this.checkRankUp(this.props.character)
    if (rank_up_available !== this.state.rank_up_available) {
      this.setState({ rank_up_available: rank_up_available })
    }
  }

  createStatTable() {
    let stat_table = []

    for(let i = 0; i < constants.STAT_NAMES.length; i += 2) {
      stat_table.push((
        <tr 
          key={i}>
          <td>
            {constants.STAT_DISPLAY_NAMES[constants.STAT_NAMES[i]]}
          </td>
          <td>
            {this.props.character[constants.STAT_NAMES[i]]}
          </td>
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
    let unit_profile = `/images/unit/thumb_unit_profile_` + 
      `${this.props.character.base_id}${(this.props.character.rarity < 3) ? 1 : 3}1.png`
    
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
                {this.props.character.name}
              </h1>
            <span 
              className={styles.badge_wrapper}>
              <Badge 
                className={styles.character_rank}>
                Rank {this.props.character.promotion_level}
              </Badge>
              <Badge 
                className={styles.character_level}>
                Lv. {this.props.character.level}
              </Badge>
            </span>
            <span 
              className={styles.character_stars}>
              <StarLevel 
                rarity={this.props.character.rarity} 
                max_rarity={this.props.rarity_data.length} />
            </span>
            <span 
              className={styles.character_rank_wrapper}>
              {this.generateRankUpButton()}
            </span>
            <div 
              className={styles.equipment_wrapper}>
              <EquipmentDisplay 
                server_data={this.props.server_data} 
                character={this.props.character}
                equipment_data={this.props.equipment_data}
                equipment_enhance_data={this.props.equipment_enhance_data}
                promotion_data={this.props.promotion_data}
                user={this.props.user}
                set_character={this.props.set_character}
                set_user={this.props.set_user} />
            </div>
          </Col>
        </Row>
        {`<UpgradeDisplay character={this.props.character} server_data={this.props.server_data} 
          user={this.props.user} /> `}
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
                    {this.props.character.total_power}
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