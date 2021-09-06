// Import Constants
import { TYPE_RARITY } from './constants/gacha_constants.js'

/**
 * Obtains the rarity of a pull
 * @param {boolean} pity determines if we
 * @param {Integer} type is the gacha type we are pulling on
 * @return {Integer} rarity of the unit we have pulled
 */
const rarity = (pity=false, type=2) => {
  let max = 0
  // Calculate the maximum pull based on the rarities
  console.log(type)
  TYPE_RARITY[type].forEach(rate => {max += rate})
  const pull = Math.random() * max

  // Current max for specified rarity
  let current_max = 0
  let start = (pity) ? 1 : 0
  let rarity = 0
  for(let i = 0; i < TYPE_RARITY[type].length; i++) {
    current_max += TYPE_RARITY[type][i]
    if (pull < current_max && i >= start) {
      rarity = i + 1
      break;
    }
  }

  return rarity
}

export default rarity