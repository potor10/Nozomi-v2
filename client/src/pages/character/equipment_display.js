import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'
import Loading from '../../components/loading/loading'
import PopUp from '../../components/popup/popup'

import styles from './equipment_display.module.css'
import constants from '../constants.json'

class EquipmentDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      equipment_loaded: false,
      current_equipment: this.props.equipment
    }

    for (let i = 1; i <= 6; i++) {
      this.state[`equip_status_${i}`] = false
      this.state[`equip_info_${i}`] = {}
      this.state[`equip_src_${i}`] = ''
    }

    this.promptTitle = this.promptTitle.bind(this)
    this.promptDescription = this.promptDescription.bind(this)
    this.failTitle = this.failTitle.bind(this)
    this.failDescription = this.failDescription.bind(this)
    this.removePopup = this.removePopup.bind(this)
    this.equipEquipment = this.equipEquipment.bind(this)
  }

  promptTitle(equipment_idx) {
    return (
      <>
        <img src={`/images/icon/icon_equipment_${this.state[`equip_info_${equipment_idx}`].equipment_id}.png`} />
        <h1>{this.state[`equip_info_${equipment_idx}`].equipment_name}</h1>
      </>
    )
  } 

  promptDescription(equipment_idx) { 
    let stats_array = []
    constants.STAT_NAMES.forEach(stat => {
      const current_stat = this.state[`equip_info_${equipment_idx}`][stat]
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

    return (
      <>
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
              <td><b>{this.state[`equip_info_${equipment_idx}`].equip_data.cost}</b>
                <img className="icon-sm" src={"/images/assets/jewel.png"} />
              </td>
            </tr>
          </tbody>
        </Table>
        <Table striped bordered hover variant="light" className={styles.equipment_stat}>
          <tbody>
            {stats_array}
          </tbody>
        </Table>
      </>
    )
  }

  failTitle(equipment_idx) {
    return (
      <>
        <img src={`/images/icon/icon_equipment_invalid_${this.state[`equip_info_${equipment_idx}`].equipment_id}.png`} />
        <h1>Could Not Equip {this.state[`equip_info_${equipment_idx}`].equipment_name}</h1>
      </>
    )
  }

  failDescription(equipment_idx) {
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
          <td><b>{this.state[`equip_info_${equipment_idx}`].equip_data.cost}</b>
            <img className="icon-sm" src={"/images/assets/jewel.png"} />
          </td>
        </tr>
        <tr>
          <td>You Need</td>
          <td><b>{Math.abs(this.props.user_stats.jewels - this.state[`equip_info_${equipment_idx}`].equip_data.cost)}</b>
            <img className="icon-sm" src={"/images/assets/jewel.png"} />
          </td>
        </tr>
      </tbody>
    </Table>
    )
  }

  checkRankUpStatus() {
    let can_rank_up = true
    for (let i = 1; i <= 6; i++) {
      if (!this.state[`equip_status_${i}`] || !this.props.equipment[i].equip_data.equippable) {
        can_rank_up = false
        break
      }
    }

    if (can_rank_up) {
      this.props.rank_up(true)
    }
  }

  async equipEquipment(equipment_idx) {
    if (this.props.user_stats.jewels >= this.state[`equip_info_${equipment_idx}`].equip_data.cost) {
      const fetch_options = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          server_id: this.props.server_data.id,
          unit_id: this.props.character.unit_id,
          equip_idx: equipment_idx 
        })
      }

      const res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/collection/equipment/equip`, fetch_options)

      if (res.status === 200) {
        const result = await res.json()
        if (result.success) {
          this.setState({
            [`equip_status_${equipment_idx}`]: 1,
            [`equip_src_${equipment_idx}`]: `/images/icon/icon_equipment_${this.state[`equip_info_${equipment_idx}`].equipment_id}.png`
          })
          this.props.reload_character()
          this.checkRankUpStatus()
          this.removePopup()
          this.props.reload_user() 
        } else {
          this.props.set_popup(
            <PopUp title={() => this.failTitle(equipment_idx)} 
            description={() => this.failDescription(equipment_idx)} 
            hide_confirm={true} cancel={this.removePopup}/>)
        }
      } else {
        this.removePopup()
      }
    } else {
      this.props.set_popup(
        <PopUp title={() => this.failTitle(equipment_idx)} 
        description={() => this.failDescription(equipment_idx)} 
        hide_confirm={true} cancel={this.removePopup}/>)
    }
  }

  removePopup() {
    this.props.set_popup(undefined)
  }

  getEquipmentData() {
    for (let i = 1; i <= 6; i++) {
      let equip_info = this.props.equipment[i]
      const equippable = (this.props.character[constants.NUMBER_TO_EQUIP[i]] === 0 && 
      equip_info.equip_data.equippable)

      console.log(equippable)

      if (equippable) {
        this.setState({ 
          [`equip_status_${i}`]: false,
          [`equip_info_${i}`]: equip_info,
          [`equip_src_${i}`]: `/images/icon/icon_equipment_invalid_${equip_info.equipment_id}.png`
        })
      } else {
        this.setState({ 
          [`equip_status_${i}`]: true,
          [`equip_info_${i}`]: equip_info,
          [`equip_src_${i}`]: `/images/icon/icon_equipment_${equip_info.equipment_id}.png`
        })
      }
    }

    this.setState({ equipment_loaded: true })
  }

  requestEquipment (equipment_idx) {
    this.props.set_popup(<PopUp title={() => this.promptTitle(equipment_idx)} 
      description={() => this.promptDescription(equipment_idx)} 
      confirm={() => this.equipEquipment(equipment_idx)} cancel={this.removePopup}/>)
  }

  componentDidMount() {
    this.getEquipmentData()
  }

  componentDidUpdate() {
    if (this.props.equipment !== this.state.current_equipment) {
      this.setState({ current_equipment: this.props.equipment })
      this.getEquipmentData()
    }
  }

  equipmentRender() {
    let equipment_array = []
    for (let i = 1; i <= 6; i++) {
      equipment_array.push((this.state[`equip_status_${i}`]) ? (
        <span className={styles.equipment} key={i}>
          <img className={styles.equipment_equipped} src={this.state[`equip_src_${i}`]}/>
        </span>
      ) : (
        <button className={styles.equipment} key={i} id={`equip_${i}`} onClick={() => this.requestEquipment(i)}>
          <img className={styles.equipment_unequipped} id={`equip_image_${i}`} src={this.state[`equip_src_${i}`]}/>
        </button>
      ))
    }
    return equipment_array
  }

  render() {
    return (
      <>
        {(this.state.equipment_loaded) ? (this.equipmentRender()) : (<Loading />) }
      </>
    )
  }
}

export default EquipmentDisplay