import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge, Nav, Navbar } from 'react-bootstrap'
import StarLevel from '../../../components/star_level/star_level'

import MoneyDisplay from './money_display/money_display'
import UpgradeDisplay from './upgrade_display/upgrade_display'
import SkillsDisplay from './skills_display/skills_display'
import InfoDisplay from './info_display/info_display'

import styles from './character_display.module.css'

class CharacterDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayed_state: 0
    }
  }

  renderCharacterTab() {
    switch (this.state.displayed_state) {
      case 0:
        return (
          <>
            <MoneyDisplay {...this.props} />
            <UpgradeDisplay {...this.props} /> 
          </>
        )
      case 1:
        return (
          <>
            <MoneyDisplay {...this.props} />
            <SkillsDisplay {...this.props} />
          </>
        )
      case 2:
        return (<InfoDisplay {...this.props}/>)
    }
  }


  render() {
    let unit_profile = `/images/unit/thumb_unit_profile_` + 
      `${this.props.unit.base_id}${(this.props.unit.rarity < 3) ? 1 : 3}1.png`
    
    const random_comment_idx = Math.floor(Math.random() * this.props.unit_comments_data.length)

    return (
      <Container className={styles.character_wrapper}>
        <Row>
          <Col lg={4}>
            <Row className="text-center">
              <h1 className={styles.character_name}>
                {this.props.unit.name}
              </h1>
              <span className={styles.badge_wrapper}>
                <Badge className={styles.character_rank}>
                  Rank {this.props.unit.promotion_level}
                </Badge>
                <Badge className={styles.character_level}>
                  Lv. {this.props.unit.level}
                </Badge>
              </span>
              <span className={styles.character_stars}>
                <StarLevel 
                  rarity={this.props.unit.rarity} 
                  max_rarity={this.props.rarity_data.length} />
              </span>
            </Row>
            <Row style={{backgroundImage: `url(${unit_profile})`}} 
              className={`${styles.character_background} text-center d-flex`}>
              <Col md={12} style={{backgroundImage: `url(${unit_profile})`}} 
                className={styles.pad_left}/>
            </Row>
            <Row className="text-center">
              {this.props.unit_comments_data[random_comment_idx].description
                .split('\\n').map((line, idx) => <small key={'desc'+idx}>{line}</small>)}
            </Row>
          </Col>
          <Col lg={8}>
            <Nav variant="tabs" defaultActiveKey="upgrade" className="me-auto">
              <Nav.Item>
                <Nav.Link className={styles.nav_link} 
                  onClick={() => { this.setState({ displayed_state: 0 }) }}
                  eventKey={"upgrade"}>Upgrade</Nav.Link>
                <Nav.Link className={styles.nav_link}  
                  onClick={() => { this.setState({ displayed_state: 1 }) }}
                  eventKey={"skills"}>Skills</Nav.Link>
                <Nav.Link className={styles.nav_link} 
                  onClick={() => { this.setState({ displayed_state: 2 }) }}
                  eventKey={"stats"}>Stats</Nav.Link>
              </Nav.Item>
            </Nav>
            {this.renderCharacterTab()}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default CharacterDisplay