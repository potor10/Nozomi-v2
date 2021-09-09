import { Table } from 'react-bootstrap'
import React, { Component } from 'react'

import { STAT_NAMES, STAT_DISPLAY_NAMES } from '../../../../../constants'
import singleEquipStat from './single_equipment_stat'

import styles from './prompt_description.module.css'

class PromptDescription extends Component { 
  render() {
    const equip_id = this.props.promotion_data[this.props.unit.promotion_level-1][`equip_slot_${this.props.equip_idx}`]
    const price = this.props.equipment_enhance_data[equip_id].total_point

    let stats_array = []
    let equip_stats = singleEquipStat(equip_id, this.props.equipment_data, this.props.equipment_enhance_data)
    
    STAT_NAMES.forEach(stat => {
      const current_stat = equip_stats[stat]
      if (current_stat !== 0) {
        stats_array.push((
          <tr key={stat}>
            <td className={styles.equipment_stat_element}>{STAT_DISPLAY_NAMES[stat]}</td>
            <td className={styles.equipment_stat_element}>
              {(current_stat > 0) ? (`+${current_stat}`) : (current_stat)}
            </td>
          </tr>
        ))
      }
    })

    return (
      <>
        <Table 
          striped 
          bordered 
          hover 
          variant="dark" 
          className={styles.equipment_price}>
          <tbody>
            <tr>
              <td>
                Your Jewels
              </td>
              <td>
                <b>{this.props.user.jewels}</b>
                <img className="icon-sm" src={"/images/assets/jewel.png"} />
              </td>
            </tr>
            <tr>
              <td>
                Price
              </td>
              <td>
                <b>{price}</b>
                <img className="icon-sm" src={"/images/assets/jewel.png"} />
              </td>
            </tr>
          </tbody>
        </Table>
        <Table 
          striped 
          bordered 
          hover 
          variant="light" 
          className={styles.equipment_stat}>
          <tbody>
            {stats_array}
          </tbody>
        </Table>
      </>
    )
  }
}

export default PromptDescription