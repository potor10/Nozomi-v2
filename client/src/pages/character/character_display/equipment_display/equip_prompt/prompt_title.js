import { Table } from 'react-bootstrap'
import React, { Component } from 'react'

import { EQUIPMENT_SRC_PREFIX } from '../../../../../constants'

class PromptTitle extends Component {
  render() {
    console.log(this.props)
    const equip_id = this.props.promotion_data[this.props.unit.promotion_level-1][`equip_slot_${this.props.equip_idx}`]
    const equip_name = this.props.equipment_data[equip_id].equipment_name

    return (
      <>
        <img src={`${EQUIPMENT_SRC_PREFIX+equip_id}.png`} />
        <h1>{equip_name}</h1>
      </>
    )
  }
} 

export default PromptTitle