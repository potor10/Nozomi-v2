import { Table } from 'react-bootstrap'
import React, { Component } from 'react'

class FailTitle extends Component {
  render() {
    return (
      <>
        {"<img src={`/images/icon/icon_equipment_invalid_${this.state[`equip_info_${equipment_idx}`].equipment_id}.png`} />"}
        {"<h1>Could Not Equip {this.state[`equip_info_${equipment_idx}`].equipment_name}</h1>"}
      </>
    )
  }
}

export default FailTitle
