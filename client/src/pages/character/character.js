import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Container, Row, Col } from 'react-bootstrap'

import Loading from '../../components/loading/loading'

import CharacterDisplay from './character_display/character_display'

import fetchCharacterData from './fetch_character_data'

import unitStats from './unit_stats'

import styles from './character.module.css'

class Character extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      unit_loaded: -1,
    }

    console.log(this.props.user_stats)
    this.setUnit = this.setUnit.bind(this)
  }

  setUnit(unit) {
    unitStats(this, unit)
  }

  renderCharacter() {
    switch (this.state.unit_loaded) {
      case -1:
        return (<Loading />)
      case 0:
        return (<p>you don't own this character</p>)
      case 1:
        return (
          <CharacterDisplay {...this.state} {...this.props} set_unit={this.setUnit} />
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