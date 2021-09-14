import React, { Component } from 'react'
import { Pagination, Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap'
import Loading from '../../components/loading/loading'
import StarLevel from '../../components/star_level/star_level'
import CharactersDisplay from './characters_display/characters_display'

import fetchCharacters from './fetch_characters'
import sortCharacters from './sort_characters'
import searchCharacters from './search_characters'

import styles from './characters.module.css'


class Characters extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      units_loaded: -1,
    }
  }

  setSort(sort_id) {
    this.setState({ sort_id: sort_id })
    this.setState({ 
      displayed_units: sortCharacters(this.state.displayed_units, sort_id)
    })
  }

  setSearch(search_term) {
    this.setState({ search_term: search_term })
    const new_units = sortCharacters(searchCharacters(this.state.units, search_term), this.state.sort_id)
    this.setState({ 
      displayed_units: new_units,
      total_pages: Math.ceil(new_units.length / this.state.page_max)
    })
  }

  setPageMax(max) {
    this.setState({ 
      page_max: max,
      total_pages: Math.ceil(this.state.displayed_units.length / max)
    })
  }

  renderCharacters() {
    switch (this.state.units_loaded) {
      case -1:
        return (
          <Loading />
        )
      case 0:
        return (
          <p>
            an error occured while loading characters
          </p>
        )
      case 1:
        return (
          <CharactersDisplay {...this.state} />
        )
    }
  }

  componentDidMount() {
    console.log("starting")
    fetchCharacters(this, this.props.server_data.id)
  }

  render() {
    return (
      <>
        <Container className={styles.settings_wrapper}>
          <Row className="text-center">
            <Col md={3} className="d-flex justify-content-center align-items-start"> 
              <Row>
                <Col md={12}>
                  <InputGroup>
                    <FormControl 
                      id="search" 
                      placeholder="search" 
                      aria-label="search" 
                      aria-describedby="search" />
                    <Button 
                      onClick={() => {
                        const search_term = document.getElementById('search').value
                        console.log(search_term)
                        this.setSearch(search_term)
                      }} 
                      variant="outline-secondary">
                      Search
                    </Button>
                  </InputGroup>
                </Col>
                <Col md={12}>
                 <h1 className={styles.settings_title}>Sort By</h1>
                  <div className="d-flex justify-content-center align-items-center">
                    <Pagination>
                      <Pagination.Item 
                        onClick={(this.state.sort_id !== 0) ? (() => this.setSort(0)) : (undefined)} 
                        activeLabel={''} 
                        active={(this.state.sort_id === 0)}>
                        Power
                      </Pagination.Item>
                      <Pagination.Item 
                        onClick={(this.state.sort_id !== 1) ? (() => this.setSort(1)) : (undefined)} 
                        activeLabel={''} 
                        active={(this.state.sort_id === 1)}>
                        Name
                      </Pagination.Item>
                      <Pagination.Item 
                        onClick={(this.state.sort_id !== 2) ? (() => this.setSort(2)) : (undefined)} 
                        activeLabel={''} 
                        active={(this.state.sort_id === 2)}>
                        Rarity
                      </Pagination.Item>
                    </Pagination>
                  </div>
                </Col>
                <Col md={12}>
                  <h1 className={styles.settings_title}>Units Per Page</h1>
                  <div className="d-flex justify-content-center align-items-center">
                    <Pagination>
                      <Pagination.Item 
                        onClick={(this.state.page_max !== 12) ? (() => this.setPageMax(12)) : (undefined)} 
                        activeLabel={''} 
                        active={(this.state.page_max === 12)}>
                        12
                      </Pagination.Item>
                      <Pagination.Item 
                        onClick={(this.state.page_max !== 24) ? (() => this.setPageMax(24)) : (undefined)} 
                        activeLabel={''} 
                        active={(this.state.page_max === 24)}>
                        24
                      </Pagination.Item>
                      <Pagination.Item 
                        onClick={(this.state.page_max !== 36) ? (() => this.setPageMax(36)) : (undefined)} 
                        activeLabel={''} 
                        active={(this.state.page_max === 36)}>
                        36
                      </Pagination.Item>
                    </Pagination>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={9}>
              {this.renderCharacters()}
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default Characters