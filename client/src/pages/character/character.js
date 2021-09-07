import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Container, Row, Col } from 'react-bootstrap'

import Loading from '../../components/loading/loading'

import CharacterDisplay from './character_components/display/character_display'
import UserStatTable from '../../components/user_stat_table/user_stat_table'

import contants from '../constants.json'
import styles from './character.module.css'

class Character extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      character_loaded: -1,
      equipment_loaded: -1,
      skills_loaded: -1,
      skills_cost_loaded: -1,
      character: {},
      equipment: {},
      skills: {},
      skills_cost: {},

      user_stats: {},
      popup: undefined,
    }

    this.getCharacter = this.getCharacter.bind(this)
    this.getEquipment = this.getEquipment.bind(this)
    this.getSkills = this.getSkills.bind(this)
    this.getUserStats = this.getUserStats.bind(this)
    this.setPopup = this.setPopup.bind(this)
  }

  async getCharacter() {
    const fetch_options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }
  
    const character_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/` + 
      `collection/characters/get/${this.props.server_data.id}/${this.props.match.params.character_id}`, fetch_options)
    console.log(this.props.match.params.character_id)
    console.log(character_res.status)
    if (character_res.status === 200) {
      const character = await character_res.json()
      const max_rarity_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/` + 
        `masterdb/ascension/max/${character.unit_id}`, fetch_options)
      if (max_rarity_res.status === 200) {
        const max_rarity = (await max_rarity_res.json()).max_rarity
        character.max_rarity = max_rarity
        this.setState({ character_loaded: 1, character: character })
      } else {
        this.setState({ character_loaded: 0 })
      }
    } else {
      this.setState({ character_loaded: 0 })
    }
  }

  async getEquipment() {
    const fetch_options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }
  
    const needed_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/` + 
      `masterdb/equipment/needed/${this.state.character.unit_id}/${this.state.character.promotion_level}`, fetch_options)
    if (needed_res.status === 200) {
      const needed_equipment = await needed_res.json()
      const equipment = {}
      for(let i = 1; i <= 6; i++) {
        const equipment_id = needed_equipment[`equip_slot_${i}`]
        const equipment_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/` + 
          `masterdb/equipment/get/${equipment_id}`, fetch_options)
        if (equipment_res.status === 200) {
          equipment[i] = await equipment_res.json()
          const equipment_cost_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/` + 
            `collection/equipment/cost/${this.props.server_data.id}/${this.state.character.unit_id}/${i}`, fetch_options)
            if (equipment_cost_res.status === 200) {
              equipment[i].equip_data = await equipment_cost_res.json()
            } else {
              this.setState({ equipment_loaded: 0 })
              break
            }
        } else {
          console.log('hey hey')
          return this.setState({ equipment_loaded: 0 })
        }
      }
      // Successful load of equipment info
      console.log(equipment)
      this.setState({ equipment_loaded: 1, equipment: equipment })
    } else {
      this.setState({ equipment_loaded: 0 })
    }
  }

  async getSkills() {
    const fetch_options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }
  
    const skills_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/` + 
      `collection/skills/all/${this.props.server_data.id}/${this.state.character.unit_id}`, fetch_options)

    if (skills_res.status === 200) {
      const skills = await skills_res.json()
      for (const skill_name in skills) {
        this.getSkillCost(skill_name)
      }
      this.setState({ skills_loaded: 1, skills: skills })
    } else {
      this.setState({ skills_loaded: 0 })
    }
  }

  async getSkill(skill_name) {
    const fetch_options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }
  
    const skill_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/` + 
      `collection/skills/get/${this.props.server_data.id}/${this.state.character.unit_id}/${skill_name}`, 
      fetch_options)

    if (skill_res.status === 200) {
      const skill = await skill_res.json()
      let new_skills = this.state.skills
      new_skills[skill_name] = skill
      this.getSkillCost(skill)
      this.setState({ skills_loaded: 1, skills: new_skills })
    } else {
      this.setState({ skills_loaded: 0 })
    }
  }

  async getSkillCost(skill_name) {
    const fetch_options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }
  
    const skill_cost_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/` + 
      `collection/skills/level/cost/${this.props.server_data.id}/${this.state.character.unit_id}/${skill_name}`, 
      fetch_options)
    if (skill_cost_res.status === 200) {
      const skill_cost = await skill_cost_res.json()
      let new_skills_cost = this.state.skills_cost
      new_skills_cost[skill_name] = skill_cost
      this.setState({ skills_cost: new_skills_cost })
    }
  }

  async getUserStats() {
    const fetch_options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }

    const user_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/account/me/${this.props.server_data.id}`, fetch_options)
    if (user_res.status === 200) {
      const user_stats = await user_res.json()
      this.setState({ user_stats: user_stats })
    }
  }

  async componentDidMount() {
    await this.getCharacter()
    await this.getEquipment()
    await this.getSkills()
    await this.getUserStats()
  }

  setPopup(popup) {
    this.setState({ popup: popup })
  }

  characterRender() {
    if (this.state.character_loaded === 0) {
      return (<p>you don't own this character</p>)
    } 

    if (this.state.equipment_loaded === 0) {
      return (<p>there was an error processing the equipment</p>)
    }

    if (this.state.skills_loaded === 0) {
      return (<p>there was an error processing the skills</p>)
    }

    if (this.state.character_loaded === 1 && 
      this.state.equipment_loaded === 1 && 
      this.state.skills_loaded === 1) {
      return (
        <>
          <Container className={styles.stat_table} >
            <Row className="d-flex justify-content-center">
              <Col md={8}>
                <UserStatTable user_stats={this.state.user_stats} />
              </Col>
            </Row>
          </Container>
          <CharacterDisplay character={this.state.character}
            server_data={this.props.server_data} equipment={this.state.equipment}
            skills={this.state.skills} skills_cost={this.state.skills_cost} user_stats={this.state.user_stats}
            reload_character={this.getCharacter} reload_equipment={this.getEquipment}
            reload_user={this.getUserStats} reload_skills={this.getSkills}
            set_popup={this.setPopup} />
        </>
      )
    }

    return (<Loading />)
  }

  render() {
    return (
      <>
        {this.characterRender()}
        {this.state.popup}
      </>
    )
  }
}

export default withRouter(Character)