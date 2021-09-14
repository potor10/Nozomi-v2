import { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import styles from './gacha_display.module.css'

import StarLevel from '../../../../components/star_level/star_level'

import { AMULET_CONVERT } from '../../../../constants'

const generateNormalDisplay = (component) => {
  let items_row_1 = []
  let items_row_2 = []

  component.props.pull_result.equipment.forEach((pull, idx) => {
    let equipment = (
      <span className={styles.pull_image_wrapper}>
        <img className={styles.icon}
          src={`/images/icon/icon_equipment_${pull.equipment_id}.png`}/>
        <span className={styles.overlay_display}>
          <img className={styles.icon}
            src={`/images/icon/icon_item_91001.png`}/>
          <small className={styles.overlay_amount}>
            x{pull.sale_price}
          </small>
        </span>
      </span>
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
      <span className={styles.pull_image_wrapper}>
        <img className={styles.icon}
          src={`/images/icon/icon_item_${pull.item_id}.png`}/>
        <span className={styles.overlay_display}>
          <img className={styles.icon}
            src={`/images/icon/icon_item_90005.png`}/>
          <small className={styles.overlay_amount}>
            x5
          </small>
        </span>
      </span>
    )
    if (equipment_length + idx < 5) {
      items_row_1.push((shard))
    } else {
      items_row_2.push((shard))
    }
  })

  const display = (
    <Container>
      <Row className={`${styles.pull_row} d-flex justify-content-center`}>
        {items_row_1}
      </Row>
      <Row className={`${styles.pull_row} d-flex justify-content-center`}>
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
    let dupe = undefined

    if (pull.dupe) {
      dupe = (
        <span className={styles.overlay_display}>
          <img className={styles.icon}
            src={`/images/icon/icon_item_90005.png`}/>
          <small className={styles.overlay_amount}>
            x{AMULET_CONVERT[pull.rarity-1]}
          </small>
        </span>
      )
    }

    const base_id = (''+pull.unit_id).substring(0, 4)
    const character = (
      <span className={styles.pull_image_wrapper}>
        <img className={styles.icon}
          src={`/images/unit/icon_unit_${base_id}${(pull.rarity < 3) ? 1 : 3}1.png`}/>
        <span className={styles.star_display}>
          <StarLevel 
            rarity={pull.rarity} 
            max_rarity={pull.rarity} 
            size={0} />
        </span>
        {dupe}
      </span>
    )
    if (idx < 5) {
      characters_row_1.push((character))
    } else {
      characters_row_2.push((character))
    }
  })

  const display = (
    <Container>
      <Row className={`${styles.pull_row} d-flex justify-content-center`}>
        {characters_row_1}
      </Row>
      <Row className={`${styles.pull_row} d-flex justify-content-center`}>
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
      <div className={`${styles.gacha_background} text-center d-flex justify-content-center align-items-center`}
        style={{ backgroundImage: 'url(/images/assets/gacha/gacha_background.png' }}>
        {this.renderDisplay()}
      </div>
    )
  }

}

export default GachaDisplay