import React, { Component } from 'react'
import { Pagination, Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap'
import StarLevel from '../../../../components/star_level/star_level'

import pagination from '../../../../lib/characters/pagination'

import styles from './characters_display.module.css'

class CharactersDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      page: 1
    }

    this.changePage = this.changePage.bind(this)
  }

  changePage(page) {
    this.setState({ page: page })
  }

  componentDidUpdate() {
    if (this.props.total_pages < this.state.page) {
      this.setState({ page: this.props.total_pages })
    }
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
                <Col xs={6} md={3} key={character.unit_id} className={`${styles.character_container} text-center`}>
                  <a href={`/character/${character.unit_id}`} className={styles.character_button}>
                    <div className={styles.character_image_wrapper}>
                      <img className={styles.character_image} 
                        style={{ backgroundImage: `url(/images/icon/icon_equipment_${this.props.promotion_data[character.unit_id][character.promotion_level-1].equip_slot_2}.png)`}}
                        src={`/images/unit/icon_unit_${character.base_id}${(character.rarity < 3) ? 1 : 3}1.png`} />
                      <span className={styles.star_display}>
                        <StarLevel rarity={character.rarity} 
                          max_rarity={this.props.rarity_data[character.unit_id].length} large={false} />
                      </span>
                    </div>
                    <div>
                      <h1 className={styles.character_name}>{character.name}</h1>
                      <small className={styles.character_power}>Power: <b>{character.total_power}</b></small>
                    </div>
                  </a>
                </Col>
              )
            })}
          </Row>
        </Container>
        <div className=" d-flex justify-content-center align-items-center">
          <Pagination className={styles.page_selector}>
            {pagination(this.state.page, this.props.total_pages, this.changePage)}
          </Pagination>
        </div>
      </>
    )
  }
}

export default CharactersDisplay