
const getUnitIconUrl = (unit) => {
  const base_id = (''+unit.unit_id).substring(0, 4)
  const unit_icon = `/images/unit/icon_unit_${base_id}${(unit.rarity < 3) ? 1 : 3}1.png`

  return unit_icon
}

export default getUnitIconUrl