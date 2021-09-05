import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'
import StarLevel from '../../components/star_level/star_level'
import Loading from '../../components/loading/loading'

import SkillsDisplay from './skills_display'
import LevelDisplay from './level_display'
import AscendDisplay from './ascend_display'

import styles from './upgrade_display.module.css'

class UpgradeDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {
    return (
      <>
        <Row className={styles.upgrade_wrapper} >
          <LevelDisplay character={this.props.character} user_stats={this.props.user_stats} 
            server_data={this.props.server_data} reload_character={this.props.reload_character} 
            reload_user={this.props.reload_user} />
          <AscendDisplay character={this.props.character} user_stats={this.props.user_stats} 
            server_data={this.props.server_data} reload_character={this.props.reload_character} 
            reload_user={this.props.reload_user} />
        </Row>
        <Row>
          <SkillsDisplay character={this.props.character} user_stats={this.props.user_stats} 
            server_data={this.props.server_data} reload_character={this.props.reload_character} 
            reload_user={this.props.reload_user} />
        </Row>
      </>
    )
  }
}

export default UpgradeDisplay
