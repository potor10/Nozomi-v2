import { Table } from 'react-bootstrap'
import React, { Component } from 'react'

import { EQUIPMENT_SRC_PREFIX } from '../../../../../constants'

class PromptTitle extends Component {
  render() {
    return (
      <>
        <img src={`${EQUIPMENT_SRC_PREFIX+this.props.equip_id}.png`} />
        <h1>{this.props.equip_name}</h1>
      </>
    )
  }
} 

export default PromptTitle