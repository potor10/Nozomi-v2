import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'

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

  renderSkills() {
    let skill_render = []

    for(const skill_name in this.props.skills) {
      let upgrade_once = (<>Lv. <b>{this.props.character[skill_name]} (MAX)</b></>)
      let upgrade_max = (<>Lv. <b>{this.props.character[skill_name]} (MAX)</b></>)

      if (this.props.character[skill_name] < this.props.character.level) {
        upgrade_once = (<>
          Lv. <b>{this.props.character[skill_name]}</b> &#8250; Lv. <b>{this.props.character[skill_name] + 1}</b>
        </>)
        upgrade_max = (<>
          Lv. <b>{this.props.character[skill_name]}</b> &#8250; Lv. <b>{this.props.character.level} (MAX)</b>
        </>)
      }

      if (this.props.character[skill_name] > 0) {
        skill_render.push((
          <Row key={skill_name} className="text-left d-flex justify-content-center">
            <Col md={2} className="d-flex justify-content-center">
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
              <div className={styles.skill_cost_wrapper}>
                <span className={styles.skill_cost}>
                  {upgrade_once}
                </span>
                <Button className={styles.skill_cost_button}>Cost</Button>
                <span className={styles.skill_cost}>
                  {upgrade_max}
                </span>
                <Button className={styles.skill_cost_button}>Cost</Button>
              </div>
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
        {this.renderSkills()}
        <hr />
      </Container>
    )
  }
}

export default SkillsDisplay
