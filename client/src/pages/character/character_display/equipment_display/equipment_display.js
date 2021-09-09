import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'
import Loading from '../../../../components/loading/loading'
import PopUp from '../../../../components/popup/popup'

import PromptTitle from './equip_prompt/prompt_title'
import PromptDescription from './equip_prompt/prompt_description'

import FailTitle from './equip_fail/fail_title'
import FailDescription from './equip_fail/fail_description'

import equipEquipment from './equip_equipment'

import styles from './equipment_display.module.css'
import constants from '../../../constants.json'

class EquipmentDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // ??? maybe take away
      popup: undefined
    }

    this.createFailPrompt = this.createFailPrompt.bind(this)
    this.removePopup = this.removePopup.bind(this)
  }

  setPopup(popup) {
    this.setState({
      popup: popup
    })
  }

  removePopup() {
    this.setState({ 
      popup: undefined 
    })
  }

  createFailPrompt(jewels, price) {
    const failPrompt = (
      <PopUp 
        title={<FailTitle />} 
        description={<FailDescription jewels={jewels} price={price}/>}
        hide_confirm={true}
        cancel={this.removePopup} />
    )

    this.setState({
      popup : failPrompt
    })
  }

  createEquipmentPrompt(equip_idx) {
    const equip_id = this.props.promotion_data[this.props.character.promotion_level-1][`equip_slot_${equip_idx}`]
    const equip_name = this.props.equipment_data[equip_id].equipment_name
    console.log(this.props.equipment_data[equip_id])
    const equip_description = this.props.equipment_data[equip_id].description
    const price = this.props.equipment_enhance_data[equip_id].total_point
    let confirm = () => {equipEquipment(this.props.server_data.id, this.props.character.unit_id, equip_idx)}
    if (this.props.user.jewels > price) {
      confirm = () => {this.createFailPrompt(this.props.user.jewels, price)}
    }
    const equipmentPrompt = (
      <PopUp 
        title={
          <PromptTitle
            equip_id={equip_id}
            equip_name={equip_name} 
            equip_description={equip_description} />
        } 
        description={<PromptDescription/>}
        confirm={confirm}
        cancel={this.removePopup} />
    )

    this.setState({
      popup : equipmentPrompt
    })
  }

  generateEquipmentButtons() {
    let equipment_array = []
    for (let i = 1; i <= 6; i++) {
      let equipment_id = this.props.promotion_data[this.props.character.promotion_level-1][`equip_slot_${i}`]

      equipment_array.push((this.props.character[`equip_slot_${i}`]) ? (
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
          onClick={() => this.createEquipmentPrompt(i)}>
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