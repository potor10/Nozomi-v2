import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'
import StarLevel from '../../components/star_level/star_level'
import Loading from '../../components/loading/loading'

import SkillsDisplay from './skills_display'
import LevelDisplay from './level_display'
import AscendDisplay from './ascend_display'

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
        <Row className="d-flex justify-content-center">
          <Col md={6}>
            <Table striped bordered hover variant="dark" className="text-center">
              <thead>
                <tr>
                  <td colSpan="2">Account Stats</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><img className="icon-sm" src="/images/assets/mana.png"/></td>
                  <td>{this.props.user_stats.mana}</td>
                </tr>
                <tr>
                  <td><img className="icon-sm" src="/images/assets/jewel.png"/></td>
                  <td>{this.props.user_stats.jewels}</td>
                </tr>
                <tr>
                  <td><img className="icon-sm" src="/images/assets/amulet.png"/></td>
                  <td>{this.props.user_stats.amulets}</td>
                </tr>
                <tr>
                  <td><img className="icon-sm" src="/images/assets/power.png"/></td>
                  <td>{this.props.user_stats.total_power}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <LevelDisplay character={this.props.character} user_stats={this.props.user_stats} 
            server_data={this.props.server_data} reload_character={this.props.reload_character} 
            reload_user={this.props.reload_user} />
          <AscendDisplay character={this.props.character} user_stats={this.props.user_stats} 
            server_data={this.props.server_data} reload_character={this.props.reload_character} 
            reload_user={this.props.reload_user} />
        </Row>
        <Row>
          {this.renderSkills()}
        </Row>
      </>
    )
  }
}

export default UpgradeDisplay
