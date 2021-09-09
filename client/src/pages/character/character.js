import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Container, Row, Col } from 'react-bootstrap'

import Loading from '../../components/loading/loading'

import CharacterDisplay from './character_display/character_display'

import fetchCharacterData from './fetch_character_data'

import contants from '../constants.json'
import styles from './character.module.css'

class Character extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      character_loaded: -1,
      user: this.props.user_stats.user,

      // Character Enhance / Stat Data Loaded From Request
      character: {}, 
      bond_cost_data: [],
      bond_data: [],
      equipment_data: {},
      equipment_enhance_data: {},
      experience_unit_data: [],
      promotion_data: [],
      promotion_stats_data: [],
      rarity_data: [],
      shop_static_price_grou_data: [],
      skill_action_data: {},
      skill_cost_data: [],
      skill_data: {},
      unit_skill_data: {}
    }

    console.log(this.props.user_stats)
    this.setCharacter = this.setCharacter.bind(this)
    this.setUser = this.setUser.bind(this)
  }

  setCharacter(character) {
    this.setState({ 
      character: character
    })
  }

  setUser(user) {
    this.setState({ 
      user: user
    })
  }


  renderCharacter() {
    switch (this.state.character_loaded) {
      case -1:
        return (
          <Loading />
        )
      case 0:
        return (
          <p>
            you don't own this character
          </p>
        )
      case 1:
        return (
          <CharacterDisplay {...this.state} set_character={this.setCharacter}
            set_user={this.setUser} />
        )
    }
  }

  componentDidMount() {
    fetchCharacterData(this, this.props.server_data.id, this.props.match.params.character_id)
  }

  render() {
    return (
      <>
        {this.renderCharacter()}
      </>
    )
  }
}

export default withRouter(Character)