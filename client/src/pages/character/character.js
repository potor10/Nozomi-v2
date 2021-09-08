import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Container, Row, Col } from 'react-bootstrap'

import Loading from '../../components/loading/loading'

import CharacterDisplay from './character_components/display/character_display'
import UserStatTable from '../../components/user_stat_table/user_stat_table'

import character from '../../lib/character/character'

import contants from '../constants.json'
import styles from './character.module.css'

class Character extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      character_loaded: -1,
      character: {},
      popup: undefined,
    }

  }

  componentDidMount() {
    character(this.props.server_data.id, this.props.match.params.character_id)
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