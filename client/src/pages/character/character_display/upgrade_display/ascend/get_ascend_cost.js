
/**
 * Calculates the needed cost of ascension to the next rarity
 */
const getAscendCost = (component) => {
  const max_ascension = component.props.rarity_data.length
  if (component.props.unit.rarity >= max_ascension) return { ascend_available: false }

  const base_rarity = component.props.unit_data.rarity

  let total_exchanged = 0
  for (let i = base_rarity + 1; i <= component.props.unit.rarity; i++) {
    total_exchanged += component.props.rarity_data[i-1].consume_num
  }

  const new_rarity = component.props.rarity_data[component.props.unit.rarity]
  const amulets_needed = new_rarity.consume_num
  const mana_cost = new_rarity.consume_gold

  let amulet_cost = 0

  for(let i = total_exchanged; i < total_exchanged + amulets_needed; i++) {
    const exchange_idx = Math.floor(i / 20)
    amulet_cost +=  component.props.shop_static_price_group_data[
      (exchange_idx <= component.props.shop_static_price_group_data.length-1) ? 
      exchange_idx : component.props.shop_static_price_group_data.length-1].count
  }

  let can_buy_ascend = false
  if (component.props.user.amulets >= amulet_cost && component.props.user.mana >= mana_cost) {
    can_buy_ascend = true
  }

  return { 
    ascend_available: true,
    can_buy_ascend: can_buy_ascend,
    amulet_cost: amulet_cost, 
    mana_cost: mana_cost 
  }
}

export default getAscendCost