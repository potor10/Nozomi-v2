import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'

import styles from './equipment_display.module.css'

import createEquipmentPrompt from './create_equip_prompt'

class EquipmentDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  generateEquipmentButtons() {
    let equipment_array = []
    for (let i = 1; i <= 6; i++) {
      let equipment_id = this.props.promotion_data[this.props.unit.promotion_level-1][`equip_slot_${i}`]

      equipment_array.push((this.props.unit[`equip_slot_${i}`] || equipment_id===999999) ? (
        <span 
          className={styles.equipment} 
          key={i}>
          <img 
            className={styles.equipment_equipped} 
            src={`/images/icon/icon_equipment_${equipment_id}.png`}/>
        </span>
      ) : (
        <button 
          className={styles.equipment} 
          key={i} 
          onClick={() => createEquipmentPrompt(this, i)}>
          <img 
            className={styles.equipment_unequipped} 
            src={`/images/icon/icon_equipment_invalid_${equipment_id}.png`}/>
        </button>
      ))
    }
    return equipment_array
  }

  componentDidMount() {
    console.log(this.props.promotion_data)
    console.log(this.props.user)
    console.log('aaaa')
  }

  render() {
    return (
      <>
        {this.generateEquipmentButtons()}
        {this.state.popup}
      </>
    )
  }
}

export default EquipmentDisplay