
import rankUpUnit from './rank_up_unit'
import { EQUIP_SLOT_PREFIX } from '../../../constants'

const updateUnitRank = (component) => {
  rankUpUnit(component)

  let unit = component.props.unit
  unit.promotion_level += 1

  for (let i = 1; i <= 6; i++) {
    unit[EQUIP_SLOT_PREFIX+i] = 0
  }

  component.props.set_unit(unit)
}

// add a check for rank up tier, and then boost skill level by 1 as well!

export default updateUnitRank