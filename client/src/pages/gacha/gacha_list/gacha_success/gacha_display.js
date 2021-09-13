import { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import styles from './gacha_display.module.css'

const generateNormalDisplay = (component) => {
  let items_row_1 = []
  let items_row_2 = []

  component.props.pull_result.equipment.forEach((pull, idx) => {
    let equipment = (
      <img className={styles.character_icon}
        src={`/images/icon/icon_equipment_${pull.equipment_id}.png`}/>
    )
    if (idx < 5) {
      items_row_1.push((equipment))
    } else {
      items_row_2.push((equipment))
    }
  })

  const equipment_length = component.props.pull_result.equipment.length
  component.props.pull_result.memory_shards.forEach((pull, idx) => {
    let shard = (
      <img className={styles.character_icon}
        src={`/images/icon/icon_item_${pull.item_id}.png`}/>
    )
    if (equipment_length + idx < 5) {
      items_row_1.push((shard))
    } else {
      items_row_2.push((shard))
    }
  })

  const display = (
    <Container>
      <Row className="d-flex justify-content-center">
        {items_row_1}
      </Row>
      <Row className="d-flex justify-content-center">
        {items_row_2}
      </Row>
    </Container>
  )

  return display
}

const generatePremiumDisplay = (component) => {
  let characters_row_1 = []
  let characters_row_2 = []

  component.props.pull_result.forEach((pull, idx) => {
    const base_id = (''+pull.unit_id).substring(0, 4)
    const character = (
      <img className={styles.character_icon}
        src={`/images/unit/icon_unit_${base_id}${(pull.rarity < 3) ? 1 : 3}1.png`}/>
    )
    if (idx < 5) {
      characters_row_1.push((character))
    } else {
      characters_row_2.push((character))
    }
  })

  const display = (
    <Container>
      <Row className="d-flex justify-content-center">
        {characters_row_1}
      </Row>
      <Row className="d-flex justify-content-center">
        {characters_row_2}
      </Row>
    </Container>
  )

  return display
}

class GachaDisplay extends Component {

  renderDisplay() {
    if (this.props.current_gachas[this.props.gacha_id].type_id === 1) {
      return generateNormalDisplay(this)
    } else {
      return generatePremiumDisplay(this)
    }
  }

  render() {
    return (
      <div className={`${styles.gacha_background}
        text-center d-flex justify-content-center align-items-center`}
        style={{ backgroundImage: 'url(/images/assets/gacha/gacha_background.png' }}>
        {this.renderDisplay()}
      </div>
    )
  }

}

export default GachaDisplay