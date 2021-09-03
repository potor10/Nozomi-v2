import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Loading from './loading'

class Characters extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      character_loaded: -1,
      character: {}
    }
  }

  async getCharacter() {
    const fetch_options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }
  
    const res = await fetch(`${process.env.REACT_APP_WEB_URL}/collection/get/${this.props.server_data.id}/${this.props.match.params.character_id}`, fetch_options)
    console.log(this.props.match.params.character_id)
    console.log(res.status)
    if (res.status === 200) {
      const character = await res.json()
      this.setState({ character_loaded: 1, character: character })
    } else {
      this.setState({ character_loaded: 0 })
    }
  }

  componentDidMount() {
    this.getCharacter()
  }

  characterSwitch() {
    switch (this.state.character_loaded) {
      case -1:
        return (<Loading />)
      case 0:
        return (<p>you don't own this character</p>)
      case 1: 
        return (<p>{JSON.stringify(this.state.character)}</p>)
    }
  }

  render() {
    return (
      <>
        {this.characterSwitch()}
      </>
    )
  }
}

export default withRouter(Characters)