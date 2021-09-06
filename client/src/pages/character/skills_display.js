import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'
import Loading from '../../components/loading/loading'

import styles from './skills_display.module.css'

class SkillsDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderActions(skill_name) {
    let actions_render = []
    this.props.skills[skill_name].actions.forEach((action, idx) =>{
      actions_render.push((
        <small key={idx} className={styles.skill_action}>{action}</small>
      ))
    })

    return actions_render
  }

  renderButtons(skill_name) {
    console.log(this.props.skills_cost)
    let upgrade_once = (<>Lv. <b>{this.props.character[skill_name]} (MAX)</b></>)
    let upgrade_max = (<>Lv. <b>{this.props.character[skill_name]} (MAX)</b></>)

    if (this.props.character[skill_name] < this.props.character.level) {
      let can_buy_level = this.props.user_stats.mana >= this.props.skills_cost[skill_name].skill_level_cost
      let can_buy_max = this.props.user_stats.mana >= this.props.skills_cost[skill_name].skill_max_cost
  
      upgrade_once = (<>Lv. <b>{this.props.character[skill_name]}</b> &#8250; Lv. <b>{this.props.character[skill_name] + 1}</b></>)
      upgrade_max = (<>Lv. <b>{this.props.character[skill_name]}</b> &#8250; Lv. <b>{this.props.character.level} (MAX)</b></>)
      
      return (
        <div>
          <div className={styles.skill_level_button_wrapper}>
            <span className={styles.skill_level_text}>
              {upgrade_once}
            </span>
            <Button onClick={() => this.props.level_up_skill(skill_name, false)} variant={(can_buy_level) ? "info" : "secondary"}
              disabled={!can_buy_level} 
              className={[styles.skill_level_button, (can_buy_level) ? (styles.skill_level_button_active) : (undefined)]}>
              <span className="d-flex align-items-center justify-content-center">
                {this.props.skills_cost[skill_name].skill_level_cost}&nbsp;<img className="icon-sm" src="/images/assets/mana.png"/>
              </span>
            </Button>
          </div>
          <div className={styles.skill_level_button_wrapper}>
            <span className={styles.skill_level_text}>
              {upgrade_max}
            </span>
            <Button onClick={() => this.props.level_up_skill(skill_name, true)} variant={(can_buy_max) ? "info" : "secondary"}
              disabled={!can_buy_max} 
              className={[styles.skill_level_button, (can_buy_level) ? (styles.skill_level_button_active) : (undefined)]}>
              <span className="d-flex align-items-center justify-content-center">
                {this.props.skills_cost[skill_name].skill_max_cost}&nbsp;<img className="icon-sm" src="/images/assets/mana.png"/>
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
    console.log(this.props.skills)
    for(const skill_name in this.props.skills) {
      if (this.props.character[skill_name] > 0) {
        skill_render.push((
          <Row key={skill_name} className="text-left d-flex justify-content-center">
            <Col md={2} className="d-flex justify-content-center align-items-center">
              <img className={styles.skill_image} 
                src={`/images/icon/icon_skill_${this.props.skills[skill_name].skill_data.icon_type}.png`}/>
            </Col>
            <Col md={7} className={styles.skill_wrapper}>
              <div className={styles.skill_description}>
                <div>
                  <h1 className={styles.skill_title}>{this.props.skills[skill_name].skill_data.name}</h1>
                  <Badge className={styles.skill_level}>Lv. {this.props.character[skill_name]}</Badge>
                </div>
                <span>{this.props.skills[skill_name].skill_data.description}</span>
                {this.renderActions(skill_name)}
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
        <hr />
        {this.renderSkillTable()}
        <hr />
      </Container>
    )
  }
}

export default SkillsDisplay
