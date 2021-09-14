import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'

import getSkillUpCost from './get_skill_up_cost'
import getSkillUpMaxCost from './get_skill_up_max_cost'

import getSkillData from './get_skill_data'

import updateSkill from './update_skill'

import styles from './skills_display.module.css'

import { SKILL_NAMES, EX_SKILL_NAMES } from '../../../../constants'

class SkillsDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderActions(actions) {
    let actions_render = []
    actions.forEach((action, idx) =>{
      actions_render.push((
        <small key={idx} className={styles.skill_action}>{action}</small>
      ))
    })

    return actions_render
  }

  renderButtons(skill_name) {
    let skill_info = getSkillUpCost(this, skill_name)
    let skill_max_info = getSkillUpMaxCost(this, skill_name)

    let upgrade_once = (<>Lv. <b>{this.props.unit[skill_name]} (MAX)</b></>)
    let upgrade_max = (<>Lv. <b>{this.props.unit[skill_name]} (MAX)</b></>)

    if (skill_info.skill_unlocked && skill_info.skill_up_available) {
      if (skill_info.skill_up_available) {
        upgrade_once = (<>Lv. <b>{this.props.unit[skill_name]}</b> &#8250; Lv. <b>{this.props.unit[skill_name] + 1}</b></>)
      }
      if (skill_max_info.skill_up_available) {
        upgrade_max = (<>Lv. <b>{this.props.unit[skill_name]}</b> &#8250; Lv. <b>{this.props.unit.level} (MAX)</b></>)
      }
      
      return (
        <div>
          <div className={styles.skill_level_button_wrapper}>
            <span className={styles.skill_level_text}>
              {upgrade_once}
            </span>
            <Button onClick={() => updateSkill(this, skill_info, skill_name)} variant={(skill_info.can_skill_up) ? "info" : "secondary"}
              disabled={!skill_info.can_skill_up} 
              className={[styles.skill_level_button, (skill_info.can_skill_up) ? (styles.skill_level_button_active) : (undefined)]}>
              <span className="d-flex align-items-center justify-content-center">
                {skill_info.mana_cost}&nbsp;<img className="icon-sm" src="/images/assets/mana.png"/>
              </span>
            </Button>
          </div>
          <div className={styles.skill_level_button_wrapper}>
            <span className={styles.skill_level_text}>
              {upgrade_max}
            </span>
            <Button onClick={() => updateSkill(this, skill_max_info, skill_name)} variant={(skill_max_info.can_skill_up) ? "info" : "secondary"}
              disabled={!skill_max_info.can_skill_up} 
              className={[styles.skill_level_button, (skill_max_info.can_skill_up) ? (styles.skill_level_button_active) : (undefined)]}>
              <span className="d-flex align-items-center justify-content-center">
                {skill_max_info.mana_cost}&nbsp;<img className="icon-sm" src="/images/assets/mana.png"/>
              </span>
            </Button>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className={styles.skill_level_button_wrapper}>
            <span className={styles.skill_level_text}>{upgrade_once}</span>
            <Button variant="secondary" disabled className={styles.skill_level_button}>
              <span className="d-flex align-items-center justify-content-center">
                &#x2715;&nbsp;<img className="icon-sm" src="/images/assets/mana.png"/>
              </span>
            </Button>
          </div>
          <div className={styles.skill_level_button_wrapper}>
            <span className={styles.skill_level_text}>{upgrade_max}</span>
            <Button variant="secondary" disabled className={styles.skill_level_button}>
              <span className="d-flex align-items-center justify-content-center">
                &#x2715;&nbsp;<img className="icon-sm" src="/images/assets/mana.png"/>
              </span>
            </Button>
          </div>
        </div>
      )
    }
  }

  renderSkillTable() {
    let skill_render = []

    let unit_skills = getSkillData(this)
    console.log(unit_skills)

    for(const skill_name in unit_skills) {
      if (this.props.unit[skill_name] > 0) {
        skill_render.push((
          <Row key={skill_name} className="text-left d-flex justify-content-center">
            <Col md={2} className="d-flex justify-content-center align-items-center">
              <img className={styles.skill_image} 
                src={`/images/icon/icon_skill_${unit_skills[skill_name].skill_data.icon_type}.png`}/>
            </Col>
            <Col md={7} className={styles.skill_wrapper}>
              <div className={styles.skill_description}>
                <div>
                  <h1 className={styles.skill_title}>{unit_skills[skill_name].skill_data.name}</h1>
                  <Badge className={styles.skill_level}>Lv. {this.props.unit[skill_name]}</Badge>
                </div>
                <span>{unit_skills[skill_name].skill_data.description}</span>
                {this.renderActions(unit_skills[skill_name].actions)}
              </div>
            </Col>
            <Col md={3} className="text-center d-flex justify-content-center">
              {this.renderButtons(skill_name)}
            </Col>
          </Row>
        ))
      } 
    }

    return skill_render
  }

  render() {
    return (
      <Container>
        {this.renderSkillTable()}
      </Container>
    )
  }
}

export default SkillsDisplay
