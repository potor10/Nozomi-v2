import { Table } from 'react-bootstrap'
import React, { Component } from 'react'

import styles from './equip_fail_description.module.css'

class EquipFailDescription extends Component {
  render() {
    const equip_id = this.props.promotion_data[this.props.unit.promotion_level-1][`equip_slot_${this.props.equip_idx}`]
    const price = this.props.equipment_enhance_data[equip_id].total_point

    return (
      <Table striped bordered hover variant="dark" className={styles.equipment_price}>
        <tbody>
          <tr>
            <td>Your Jewels</td>
            <td><b>{this.props.user_stats.jewels}</b>
              <img className="icon-sm" src={"/images/assets/jewel.png"} />
            </td>
          </tr>
          <tr>
            <td>Price</td>
            <td><b>{price}</b>
              <img className="icon-sm" src={"/images/assets/jewel.png"} />
            </td>
          </tr>
          <tr>
            <td>You Need</td>
            <td><b>{Math.abs(this.props.user_stats.jewels - price)}</b>
              <img className="icon-sm" src={"/images/assets/jewel.png"} />
            </td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

export default EquipFailDescription
