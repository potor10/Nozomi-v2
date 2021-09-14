import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'

import updateUnitRank from './update_unit_rank'

import styles from './equipment_display.module.css'

import createEquipmentPrompt from './create_equip_prompt'

import { NUMBER_TO_EQUIP } from '../../../../../constants'

class EquipmentDisplay extends Component {
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
        <Button onClick={() => updateUnitRank(this)} 
          className={styles.rank_up} 
          variant="info">
          Rank Up
        </Button>
      ) 
    } else { 
      return (
        <Button className={styles.rank_button} 
          variant="secondary" 
          disabled>
          Rank Up
        </Button>
      )
    }
  }

  generateEquipmentButtons() {
    let equipment_array = []
    for (let i = 1; i <= 6; i++) {
      let equipment_id = this.props.promotion_data[this.props.unit.promotion_level-1][`equip_slot_${i}`]

      equipment_array.push((this.props.unit[`equip_slot_${i}`] || equipment_id===999999) ? (
        <span className={styles.equipment_button} key={i}>
          <img 
            className={`${styles.equipment_icon} ${styles.equipment_equipped}`} 
            src={`/images/icon/icon_equipment_${equipment_id}.png`}/>
        </span>
      ) : (
        <button className={styles.equipment_button} key={i} 
          onClick={() => createEquipmentPrompt(this, i)}>
          <img 
            className={`${styles.equipment_icon} ${styles.equipment_unequipped}`} 
            src={`/images/icon/icon_equipment_invalid_${equipment_id}.png`}/>
        </button>
      ))
    }
    
    return (
      <>
        <div>
          {equipment_array.slice(0, 3)}
        </div>
        <div>
          {equipment_array.slice(3, 6)}
        </div>
      </>
    )
  }

  componentDidUpdate() {
    const rank_up_available = this.checkRankUp(this.props.unit)
    if (rank_up_available !== this.state.rank_up_available) {
      this.setState({ rank_up_available: rank_up_available })
    }
  }

  componentDidMount() {
    console.log(this.props.promotion_data)
    console.log(this.props.user)
    console.log('aaaa')
  }

  render() {
    return (
      <>
        <div className={styles.equipment_button_wrapper}>
          {this.generateEquipmentButtons()}
        </div>
        {this.generateRankUpButton()}
        {this.state.popup}
      </>
    )
  }
}

export default EquipmentDisplay