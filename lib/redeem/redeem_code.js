// Import Classes
import CodeDatabase from '../databases/code_database.js'
import RedeemDatabase from '../databases/redeem_database.js'

// Import Functions
import currentTime from '../time/current_time.js'
import redeemAmulets from './redeem_components/redeem_amulets.js'
import redeemUnit from './redeem_components/redeem_unit.js'
import redeemExchangePoints from './redeem_components/redeem_exchange_points.js'
import redeemJewels from './redeem_components/redeem_jewels.js'
import redeemMana from './redeem_components/redeem_mana.js'

// Import Constants
import { REDEEM_ERRORS } from '../constants.js'

/**
 * Redeems a code 
 * @param {String} code_hash is the code that the user is redeeming
 * @param {String} discord_id the account id of the requester
 * @param {String} server_id is the discord server id making the request
 * @return {Object} result of attempting to redeem the code
 */
const redeemCode = (code_hash, discord_id, server_id) => {
  const code_db = new CodeDatabase()
  const redeem_db = new RedeemDatabase(server_id)

  const code = code_db.getCode(code_hash)

  if (code === undefined || code.uses >= code.max_use) {
    return {
      success: false,
      error: REDEEM_ERRORS.INCORRECT
    }
  } else if (redeem_db.getRedeem(code_hash, discord_id) !== undefined) {
    return {
      success: false,
      error: REDEEM_ERRORS.ALREADY_REDEEMED
    }
  } else if (code.expiration < currentTime()) {
    return {
      success: false,
      error: REDEEM_ERRORS.EXPIRED
    }
  } else if (code.target_server !== null && code.target_server !== server_id) {
    return {
      success: false,
      error: REDEEM_ERRORS.WRONG_SERVER
    }
  }

  let code_result = {}
  switch (code.reward_type) {
    case 'jewels':
      code_result = redeemJewels(code, discord_id, server_id)
      break
    case 'mana':
      code_result = redeemMana(code, discord_id, server_id)
      break
    case 'amulets':
      code_result = redeemAmulets(code, discord_id, server_id)
      break
    case 'exchange_points':
      code_result = redeemExchangePoints(code, discord_id, server_id)
      break
    case 'unit':
      code_result = redeemUnit(code, discord_id, server_id)
      break
  }

  code_db.useCode(code_hash)
  redeem_db.addRedeem(code_hash, discord_id)

  return code_result
}

export default redeemCode