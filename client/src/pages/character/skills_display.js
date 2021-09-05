import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'
import Loading from '../../components/loading/loading'

import styles from './skills_display.module.css'

class SkillsDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      skill_cost: {},
      skills_loaded: -1,
      skills: {}
    }
  }

  async getSkills() {
    const fetch_options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }
  
    const skills_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/` + 
      `collection/skills/all/${this.props.server_data.id}/${this.props.character.unit_id}`, fetch_options)

    if (skills_res.status === 200) {
      const skills = await skills_res.json()
      console.log(skills)
      this.setState({ skills: skills })
      await this.getAllSkillsCost()
    } else {
      this.setState({ skills_loaded: 0 })
    }
  }

  async getAllSkillsCost() {
    for (const skill_name in this.state.skills) {
      if (this.props.character[skill_name] < this.props.character.level) {
        const fetch_options = {
          method: 'GET',
          mode: 'cors',
          credentials: 'include'
        }
      
        const skill_cost_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/` + 
          `collection/skills/level/cost/${this.props.server_data.id}/${this.props.character.unit_id}/${skill_name}`, 
          fetch_options)
        const skill_max_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/` + 
          `collection/skills/level/max_cost/${this.props.server_data.id}/${this.props.character.unit_id}/${skill_name}`, 
          fetch_options)

        if (skill_cost_res.status === 200 && skill_max_res.status === 200) {
          const skill_level_cost = await skill_cost_res.json()
          const skill_max_cost = await skill_max_res.json()
          let new_skills = this.state.skills 
          new_skills[skill_name].skill_level_cost = skill_level_cost
          new_skills[skill_name].skill_max_cost = skill_max_cost
          this.setState({ skills_loaded: 1, skills: new_skills })
        } else {
          this.setState({ skills_loaded: 0 })
          break
        }
      }
    }
  }

  async getSkill(skill_name) {
    const fetch_options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }
  
    const skill_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/` + 
      `collection/skills/get/${this.props.server_data.id}/${this.props.character.unit_id}/${skill_name}`, fetch_options)

    if (skill_res.status === 200) {
      const skill = await skill_res.json()
      let new_skills = this.state.skills
      new_skills[skill_name] = skill
      this.setState({ skills: new_skills })
      await this.getSkillCost(skill_name)
    } else {
      this.setState({ skills_loaded: 0 })
    }
  }

  async getSkillCost(skill_name) {
    if (this.props.character[skill_name] < this.props.character.level) {
      const fetch_options = {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      }
    
      const skill_cost_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/` + 
        `collection/skills/level/cost/${this.props.server_data.id}/${this.props.character.unit_id}/${skill_name}`, 
        fetch_options)
      const skill_max_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/` + 
        `collection/skills/level/max_cost/${this.props.server_data.id}/${this.props.character.unit_id}/${skill_name}`, 
        fetch_options)

      if (skill_cost_res.status === 200 && skill_max_res.status === 200) {
        const skill_level_cost = await skill_cost_res.json()
        const skill_max_cost = await skill_max_res.json()
        let new_skills = this.state.skills 
        new_skills[skill_name].skill_level_cost = skill_level_cost
        new_skills[skill_name].skill_max_cost = skill_max_cost
        this.setState({ skills_loaded: 1, skills: new_skills })
      } else {
        this.setState({ skills_loaded: 0 })
      }
    }
  }

  componentDidMount() {
    this.getSkills()
  }

  renderActions(skill_name) {
    let actions_render = []
    this.state.skills[skill_name].actions.forEach((action, idx) =>{
      actions_render.push((
        <small key={idx} className={styles.skill_action}>{action}</small>
      ))
    })

    return actions_render
  }

  renderButtons(skill_name) {
    let can_buy_level = this.props.user_stats.mana >= this.state.skills[skill_name].skill_level_cost
    let can_buy_max = this.props.user_stats.mana >= this.state.skills[skill_name].skill_max_cost

    let upgrade_once = (<>Lv. <b>{this.props.character[skill_name]} (MAX)</b></>)
    let upgrade_max = (<>Lv. <b>{this.props.character[skill_name]} (MAX)</b></>)

    if (this.props.character[skill_name] < this.props.character.level) {
      upgrade_once = (<>Lv. <b>{this.props.character[skill_name]}</b> &#8250; Lv. <b>{this.props.character[skill_name] + 1}</b></>)
      upgrade_max = (<>Lv. <b>{this.props.character[skill_name]}</b> &#8250; Lv. <b>{this.props.character.level} (MAX)</b></>)
      
      return (
        <div>
          <div className={styles.skill_level_button_wrapper}>
            <span className={styles.skill_level_text}>
              {upgrade_once}
            </span>
            <Button onClick={() => { return true}} variant={(can_buy_level) ? "info" : "secondary"}
              disabled={!can_buy_level} 
              className={[styles.skill_level_button, (can_buy_level) ? (styles.skill_level_button_active) : (undefined)]}>
              <span className="d-flex align-items-center justify-content-center">
                {this.state.skills[skill_name].skill_level_cost}&nbsp;<img className="icon-sm" src="/images/assets/mana.png"/>
              </span>
            </Button>
          </div>
          <div className={styles.skill_level_button_wrapper}>
            <span className={styles.skill_level_text}>
              {upgrade_max}
            </span>
            <Button onClick={() => {return true}} variant={(can_buy_max) ? "info" : "secondary"}
              disabled={!can_buy_max} 
              className={[styles.skill_level_button, (can_buy_level) ? (styles.skill_level_button_active) : (undefined)]}>
              <span className="d-flex align-items-center justify-content-center">
                {this.state.skills[skill_name].skill_max_cost}&nbsp;<img className="icon-sm" src="/images/assets/mana.png"/>
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
          <small className={styles.blurb}>Increase Your Character Level To Continue Upgrading</small>
        </div>
      )
    }
  }

  renderSkillTable() {
    let skill_render = []

    for(const skill_name in this.state.skills) {
      if (this.props.character[skill_name] > 0) {
        skill_render.push((
          <Row key={skill_name} className="text-left d-flex justify-content-center">
            <Col md={2} className="d-flex justify-content-center">
              <img className={styles.skill_image} 
                src={`/images/icon/icon_skill_${this.state.skills[skill_name].skill_data.icon_type}.png`}/>
            </Col>
            <Col md={7} className={styles.skill_wrapper}>
              <div className={styles.skill_description}>
                <div>
                  <h1 className={styles.skill_title}>{this.state.skills[skill_name].skill_data.name}</h1>
                  <Badge className={styles.skill_level}>Lv. {this.props.character[skill_name]}</Badge>
                </div>
                <span>{this.state.skills[skill_name].skill_data.description}</span>
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

  renderSkills() {
    switch (this.state.skills_loaded) {
      case 0:
        return (<Loading />)
      case 1:
        return (this.renderSkillTable())
      default:
        return(<p>error loading skills</p>)
    }
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
