import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'
import StarLevel from '../../components/star_level/star_level'
import Loading from '../../components/loading/loading'
import SkillsDisplay from './skills_display'

import styles from './upgrade_display.module.css'

class UpgradeDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      this.setState({ skills_loaded: 1, skills: skills })
    } else {
      this.setState({ skills_loaded: 0 })
    }
  }

  renderSkills() {
    switch (this.state.skills_loaded) {
      case 0:
        return (<Loading />)
      case 1:
        return (<SkillsDisplay character={this.props.character} 
          server_data={this.props.server_data} skills={this.state.skills} />)
      default:
        return(<p>error loading skills</p>)
    }
  }

  componentDidMount() {
    this.getSkills()
  }

  render() {
    return (
      <>
        {this.renderSkills()}
      </>
    )
  }
}

export default UpgradeDisplay
