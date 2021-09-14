import React, { Component } from 'react'
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap'
import StarLevel from '../../../../components/star_level/star_level'
import Loading from '../../../../components/loading/loading'

import LevelDisplay from './level/level_display'
import AscendDisplay from './ascend/ascend_display'
import BondDisplay from './bond/bond_display'
import EquipmentDisplay from './equipment/equipment_display'

import styles from './upgrade_display.module.css'

class UpgradeDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {}

  }

  render() {
    return (
      <>
        <Row className={`${styles.upgrade_wrapper} text-center`} >
          <Col md={6} >
            <EquipmentDisplay {...this.props} />
          </Col>
          <Col md={6}>
            <LevelDisplay {...this.props} />
          </Col>
        </Row>
        <Row className={`${styles.upgrade_wrapper} text-center`} >
          <Col md={6} className="text-center">
            <AscendDisplay {...this.props} />
          </Col>
          <Col md={6} className="text-center">
            <BondDisplay {...this.props} />
          </Col>
        </Row>
      </>
    )
  }
}

export default UpgradeDisplay
