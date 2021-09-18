import React, { Component } from 'react'
import { Pagination, Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap'
import StarLevel from '../../../components/star_level/star_level'

import generatePagination from './generate_pagination'
import getUnitIconUrl from '../../../lib/url/get_unit_icon_url'

import styles from './characters_display.module.css'
import { Link } from 'react-router-dom'

class CharactersDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      page: 1
    }

    this.changePage = this.changePage.bind(this)
  }

  generateCharacterButtons() {
    const character_buttons = this.props.displayed_units
      .slice(this.props.page_max * (this.state.page - 1), this.props.page_max * this.state.page)
      .map(character => {
        return (
          <Col xs={4} md={3} lg={2}
            key={character.unit_id} 
            className={`${styles.character_container} text-center`}>
            <Link to={`/character/${character.unit_id}`} className={styles.character_button}>
              <div className={styles.character_image_wrapper}>
                <div className={styles.character_border}
                  style={{ 
                    backgroundImage: `url(/images/icon/icon_equipment_${this.props.promotion_data[character.unit_id][character.promotion_level-1].equip_slot_2}.png)`
                  }} 
                />
                <img className={styles.character_image} src={getUnitIconUrl(character)} />
                <span 
                  className={styles.star_display}>
                  <StarLevel 
                    rarity={character.rarity} 
                    max_rarity={this.props.rarity_data[character.unit_id].length} 
                    size={0} />
                </span>
              </div>
              <div>
                <h1 
                  className={styles.character_name}>
                  {character.name}
                </h1>
                <small 
                  className={styles.character_power}>
                  Power: <b>{character.total_power}</b>
                </small>
              </div>
            </Link>
          </Col>
        )
      }
    )

    return character_buttons
  }

  changePage(page) {
    this.setState({ page: page })
  }

  componentDidUpdate() {
    if (this.props.total_pages !== 0) {
      if (this.props.total_pages < this.state.page) {
        this.setState({ page: this.props.total_pages })
      }
    } else if (this.state.page !== 1) {
      this.setState({ page: 1 })
    }
  }

  render() {
    return(
      <>
        <Container 
          className={`${styles.characters_wrapper} d-flex justify-content-center align-items-center`}>
          <Row 
            className={styles.characters_row}>
            {this.generateCharacterButtons()}
          </Row>
        </Container>
        <div 
          className=" d-flex justify-content-center align-items-center">
          <Pagination 
            className={styles.page_selector}>
            {generatePagination(this.state.page, this.props.total_pages, this.changePage)}
          </Pagination>
        </div>
      </>
    )
  }
}

export default CharactersDisplay