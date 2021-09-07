import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'
import StarLevel from '../../../../../components/star_level/star_level'
import Loading from '../../../../../components/loading/loading'

import SkillsDisplay from './skills/skills_display'
import LevelDisplay from './level/level_display'
import AscendDisplay from './ascend/ascend_display'

import constants from '../../../../constants.json'

import styles from './upgrade_display.module.css'

class UpgradeDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.levelUpSkill = this.levelUpSkill.bind(this)
  }

  async levelUpSkill(skill_name, max) {
    let mana_cost = this.props.skills[skill_name].skill_level_cost
    if (max) {
      mana_cost = this.props.skills[skill_name].skill_max_cost
    } 

    if (this.props.user_stats.mana >= mana_cost) {
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
          skill_name: skill_name,
          max: max 
        })
      }

      const res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/collection/skills/level/level_up`, fetch_options)

      if (res.status === 200) {
        const result = await res.json()
        if (result.success) {
          await this.props.reload_character()
          await this.props.reload_user() 
          await this.props.reload_skills()
        } 
      } 
    }
  }

  render() {
    return (
      <>
        <Row className={styles.upgrade_wrapper} >
          <LevelDisplay character={this.props.character} user_stats={this.props.user_stats} 
            server_data={this.props.server_data} reload_character={this.props.reload_character} 
            reload_user={this.props.reload_user} reload_skills={this.props.reload_skills} />
          <AscendDisplay character={this.props.character} user_stats={this.props.user_stats} 
            server_data={this.props.server_data} reload_character={this.props.reload_character} 
            reload_user={this.props.reload_user} />
        </Row>
          <SkillsDisplay character={this.props.character} user_stats={this.props.user_stats} 
            server_data={this.props.server_data} 
            skills={this.props.skills} skills_cost={this.props.skills_cost} level_up_skill={this.levelUpSkill}/>
      </>
    )
  }
}

export default UpgradeDisplay
