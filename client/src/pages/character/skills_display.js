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
    this.props.skills[skill_name].actions.forEach(action =>{
      actions_render.push((
        <small className={styles.skill_action}>{action}</small>
      ))
    })

    return actions_render
  }

  renderSkills() {
    let skill_render = []

    for(const skill_name in this.props.skills) {
      if (this.props.character[skill_name] > 0) {
        skill_render.push((
          <>
            <Col md={3} key={skill_name} className="d-flex justify-content-center align-items-center">
              <img className={styles.skill_image} 
                src={`/images/icon/icon_skill_${this.props.skills[skill_name].skill_data.icon_type}.png`}/>
            </Col>
            <Col md={8} className={styles.skill_wrapper}>
              <div className={styles.skill_description}>
                <div>
                  <h1 className={styles.skill_title}>{this.props.skills[skill_name].skill_data.name}</h1>
                  <Badge className={styles.skill_level}>Lv. {this.props.character[skill_name]}</Badge>
                </div>
                <span>{this.props.skills[skill_name].skill_data.description}</span>
                {this.renderActions(skill_name)}
              </div>
            </Col>
          </>
        ))
      } 
    }

    return skill_render
  }

  render() {
    return (
      <Container>
        <Row className="text-left d-flex justify-content-center">
          <hr />
          {this.renderSkills()}
          <hr />
        </Row>
      </Container>
    )
  }
}

export default SkillsDisplay
