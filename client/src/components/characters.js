import React, { Component } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import Loading from './loading'

const CharacterDisplay = ({ characters }) => {
  console.log(characters)
  const priconne_icon_url = 'priconne-cdn-extract/out/en/icon/extract/latest'
  const priconne_unit_url = 'priconne-cdn-extract/out/en/unit/extract/latest'
  return(
    <Container>
      <Row>
        {characters.map(character => {
          return (
            <Col key={character.unit_id}>
              <img src={`${process.env.PUBLIC_URL}/../../${priconne_unit_url}/icon_unit_${character.unit_id}`} />
              <a href={`/character/${character.unit_id}`}>{character.name}</a>
              <p>{character.total_power}</p>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

class Characters extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      characters_loaded: false,
      characters: {}
    }
  }

  async getCharacters() {
    const fetch_options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }
  
    const res = await fetch(`${process.env.REACT_APP_WEB_URL}/collection/all/${this.props.server_data.id}`, fetch_options)
    if (res.status === 200) {
      const characters = await res.json()
      this.setState({ characters_loaded: true, characters: characters })
    }
  }

  componentDidMount() {
    this.getCharacters()
  }

  render() {
    return (
      <>
        {(this.state.characters_loaded) ? (<CharacterDisplay characters={this.state.characters}/>) : (<Loading />)}
      </>
    )
  }
}

export default Characters