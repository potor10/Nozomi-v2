import React, { Component } from 'react'
import { Pagination, Container, Row, Col } from 'react-bootstrap'
import Loading from '../../components/loading/loading'
import StarLevel from '../../components/star_level/star_level'

import styles from './characters.module.css'

class CharacterDisplay extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      page: 1
    }
  }

  changePage(page) {
    this.setState({ page: page })
  }

  generatePagination() {
    let pages = []

    if (this.state.page > 3) {
      pages.push((<Pagination.Item key={'start'} onClick={() => this.changePage(1)}>1</Pagination.Item>))
      pages.push((<Pagination.Item key={'seperator-1'} >...</Pagination.Item>))
    }

    let start = 0
    let end = 0
    if (this.state.page < 3) {
      start = 1
      end = Math.min(this.props.total_pages, 5)
    } else if (this.state.page > (this.props.total_pages - 2)) {
      start = Math.max(this.props.total_pages - 4, 1)
      end = this.props.total_pages
    } else {
      start = this.state.page-2
      end = this.state.page+2
    }

    for(let i = start; i <= end; i++) {
      pages.push((
        (this.state.page === i) ? 
          (<Pagination.Item key={i} activeLabel={''} active>{i}</Pagination.Item>) :
          (<Pagination.Item key={i} onClick={() => this.changePage(i)}>{i}</Pagination.Item>)
      ))
    }

    if (this.state.page < this.props.total_pages - 2) {
      pages.push((<Pagination.Item key={'seperator-2'}>...</Pagination.Item>))
      pages.push((
        <Pagination.Item key={'end'} onClick={() => this.changePage(this.props.total_pages)}>
          {this.props.total_pages}
        </Pagination.Item>
      ))
    }

    return (
      <Pagination className={styles.page_selector}>
        {pages}
      </Pagination>
    )
  }

  render() {
    return(
      <>
        <Container className={`${styles.characters_wrapper} d-flex justify-content-center align-items-center`}>
          <Row className={styles.characters_row}>
            {this.props.characters
              .slice(this.props.page_max * (this.state.page - 1), this.props.page_max * this.state.page)
              .map(character => {
              return (
                <Col key={character.unit_id} className={`${styles.character_container} text-center`}>
                  <a href={`/character/${character.unit_id}`} className={styles.character_button}>
                    <div>
                      <img src={`/images/unit/icon_unit_${character.base_id}${(character.rarity < 3) ? 1 : 3}1.png`} />
                    </div>
                    <div>
                      <h1 className={styles.character_name}>{character.name}</h1>
                      <small className={styles.character_power}>Power: 
                        <b>{character.total_power}</b>
                      </small>
                      <span className={styles.star_display}>
                        <StarLevel rarity={character.rarity} max_rarity={character.max_rarity} large={false} />
                      </span>
                    </div>
                  </a>
                </Col>
              )
            })}
          </Row>
        </Container>
        <div className=" d-flex justify-content-center align-items-center">
          {this.generatePagination()}
        </div>
      </>
    )
  }
}

class Characters extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      characters_loaded: false,
      characters: {},
      sort_id: 0,
      page_max: 12,
      total_pages: 0
    }
  }

  async getCharacters(sort_id) {
    this.setState({ characters_loaded: false })
    const fetch_options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }
  
    const characters_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/` + 
      `collection/characters/all/${this.props.server_data.id}/${sort_id}`, fetch_options)
    if (characters_res.status === 200) {
      const characters = await characters_res.json()

      for(const idx in characters) {
        const max_rarity_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/masterdb/` +
          `ascension/max/${characters[idx].unit_id}`, fetch_options)
        if (max_rarity_res.status === 200) {
          characters[idx].max_rarity = (await max_rarity_res.json()).max_rarity
        } else {
          return this.setState({ characters_loaded: false })
        }
      }

      this.setState({ 
        characters_loaded: true, 
        characters: characters, 
        total_pages: Math.ceil(characters.length / this.state.page_max)
      })
    }
  }

  componentDidMount() {
    this.getCharacters(0)
  }

  setSort(sort_id) {
    this.setState({ sort_id: sort_id })
    this.getCharacters(sort_id)
  }

  setPageMax(max) {
    this.setState({ 
      page_max: max,
      total_pages: Math.ceil(this.state.characters.length / max)
    })
  }

  render() {
    return (
      <>
        <Container className={styles.settings_wrapper}>
          <Row className="text-center">
            <Col md={2} />
            <Col md={4}>
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
            <Col md={4}>
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
            <Col md={2} />
          </Row>
        </Container>
        {(this.state.characters_loaded) ? (
          <CharacterDisplay characters={this.state.characters} 
            page_max={this.state.page_max} total_pages={this.state.total_pages}/>) : (<Loading />)}
      </>
    )
  }
}

export default Characters