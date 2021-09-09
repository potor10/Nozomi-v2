import { Table } from 'react-bootstrap'
import React, { Component } from 'react'

import constants from '../../../../constants.json'

import styles from './prompt_description.module.css'

class PromptDescription extends Component { 
  render() {
    let stats_array = []
    /*
    constants.STAT_NAMES.forEach(stat => {
      const current_stat = this.prompt[`equip_info_${equipment_idx}`][stat]
      if (current_stat !== 0) {
        stats_array.push((
          <tr key={stat}>
            <td className={styles.equipment_stat_element}>{constants.STAT_DISPLAY_NAMES[stat]}</td>
            <td className={styles.equipment_stat_element}>
              {(current_stat > 0) ? (`+${current_stat}`) : (current_stat)}
            </td>
          </tr>
        ))
      }
    })
    */

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
                {"<b>{this.props.user_stats.jewels}</b>"}
                <img className="icon-sm" src={"/images/assets/jewel.png"} />
              </td>
            </tr>
            <tr>
              <td>
                Price
              </td>
              <td>
                {"<b>{this.state[`equip_info_${equipment_idx}`].equip_data.cost}</b>"}
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
            {"stats_array"}
          </tbody>
        </Table>
      </>
    )
  }
}

export default PromptDescription