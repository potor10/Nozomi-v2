import React, { Component } from 'react'
import { Pagination, Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap'
import Loading from '../../components/loading/loading'
import StarLevel from '../../components/star_level/star_level'
import CharactersDisplay from './characters_components/display/characters_display'

import characters from '../../lib/characters/characters'
import sort from '../../lib/characters/sort'
import search from '../../lib/characters/search'

import styles from './characters.module.css'


class Characters extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      characters_loaded: -1,

      //
      rarity_data: {},
      promotion_data: {},
      collection_units: {},

      //
      characters: {},
      sort_id: 0,
      search_term: '',
      page_max: 12,
      total_pages: 0
    }
  }

  setSort(sort_id) {
    this.setState({ sort_id: sort_id })
    this.setState({ 
      characters: sort(this.state.characters, sort_id)
    })
  }

  setSearch(search_term) {
    this.setState({ search_term: search_term })
    const new_characters = sort(search(this.state.collection_units, search_term), this.state.sort_id)
    this.setState({ 
      characters: new_characters,
      total_pages: Math.ceil(new_characters.length / this.state.page_max)
    })
  }

  setPageMax(max) {
    this.setState({ 
      page_max: max,
      total_pages: Math.ceil(this.state.characters.length / max)
    })
  }

  renderCharacters() {
    switch (this.state.characters_loaded) {
      case -1:
        return (<Loading />)
      case 0:
        return (<p>an error occured while loading characters</p>)
      case 1:
        return (<CharactersDisplay rarity_data={this.state.rarity_data} promotion_data={this.state.promotion_data} 
          characters={this.state.characters} page_max={this.state.page_max} total_pages={this.state.total_pages}/>)
    }
  }

  componentDidMount() {
    console.log("starting")
    characters(this, this.props.server_data.id, this.state.page_max)
  }

  render() {
    return (
      <>
        <Container className={styles.settings_wrapper}>
          <Row className="text-center">
            <Col md={12} className="d-flex justify-content-center align-items-center"> 
              <InputGroup>
                <FormControl id="search" placeholder="search" aria-label="search" aria-describedby="search" />
                <Button onClick={() => {
                    const search_term = document.getElementById('search').value
                    console.log(search_term)
                    this.setSearch(search_term)
                  }} 
                  variant="outline-secondary">
                  Search
                </Button>
              </InputGroup>
            </Col>
            <Col md={6}>
              <h1 className={styles.settings_title}>Sort By</h1>
              <div className="d-flex justify-content-center align-items-center">
                <Pagination>
                  <Pagination.Item onClick={(this.state.sort_id !== 0) ? (() => this.setSort(0)) : (undefined)} 
                    activeLabel={''} active={(this.state.sort_id === 0)}>
                    Power
                  </Pagination.Item>
                  <Pagination.Item onClick={(this.state.sort_id !== 1) ? (() => this.setSort(1)) : (undefined)} 
                    activeLabel={''} active={(this.state.sort_id === 1)}>
                    Name
                  </Pagination.Item>
                  <Pagination.Item onClick={(this.state.sort_id !== 2) ? (() => this.setSort(2)) : (undefined)} 
                    activeLabel={''} active={(this.state.sort_id === 2)}>
                    Rarity
                  </Pagination.Item>
                </Pagination>
              </div>
            </Col>
            <Col md={6}>
              <h1 className={styles.settings_title}>Units Per Page</h1>
              <div className="d-flex justify-content-center align-items-center">
                <Pagination>
                  <Pagination.Item onClick={(this.state.page_max !== 12) ? (() => this.setPageMax(12)) : (undefined)} 
                    activeLabel={''} active={(this.state.page_max === 12)}>
                    12
                  </Pagination.Item>
                  <Pagination.Item onClick={(this.state.page_max !== 24) ? (() => this.setPageMax(24)) : (undefined)} 
                    activeLabel={''} active={(this.state.page_max === 24)}>
                    24
                  </Pagination.Item>
                  <Pagination.Item onClick={(this.state.page_max !== 36) ? (() => this.setPageMax(36)) : (undefined)} 
                    activeLabel={''} active={(this.state.page_max === 36)}>
                    36
                  </Pagination.Item>
                </Pagination>
              </div>
            </Col>
          </Row>
        </Container>
        {this.renderCharacters()}
      </>
    )
  }
}

export default Characters