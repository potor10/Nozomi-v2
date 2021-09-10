import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'
import StarLevel from '../../../../components/star_level/star_level'
import Loading from '../../../../components/loading/loading'

import SkillsDisplay from './skills/skills_display'
import LevelDisplay from './level/level_display'
import AscendDisplay from './ascend/ascend_display'
import BondDisplay from './bond/bond_display'

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
          <LevelDisplay {...this.props} />
          <AscendDisplay {...this.props} />
        </Row>
        <SkillsDisplay {...this.props} />
        <Row>
          <BondDisplay {...this.props} />
        </Row>
      </>
    )
  }
}

export default UpgradeDisplay
