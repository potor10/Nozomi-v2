// Dependencies
const ApiException = require('./api_exception')

// Manages Gacha
module.exports = class Gacha {
  constructor(server_id=0, master_db, account_db, collection_db) {
    this._master_db = master_db
    this._account_db = account_db
    this._collection_db = collection_db

    this._rarity_one = 795
    this._rarity_two = 975
    this._rarity_three = 1000

    this._amulet_payout = [1, 10, 50]

    this._roll_cost = -150
  }

  rarity(offset=0) {
    const range = 1000 - offset
    const roll = Math.floor(Math.random() * range) + offset
    let rarity = 3
    if (roll < this._rarity_one) rarity = 1
    else if (roll < this._rarity_two) rarity = 2

    return rarity
  }

  roll(id, pity_offset=0) {  
    const rarity = this.rarity(pity_offset)
    let result = { rarity: rarity }

    const unit_id = this._master_db.getRandomUnit(rarity).unit_id
    result.id = unit_id
    if (this._collection_db.unitExists(id, unit_id)) {
      this._account_db.addAmulets(id, this._amulet_payout[rarity-1])
      result.dupe = true
    } else {
      this._collection_db.addUnit(id, unit_id)
      result.dupe = false
    }

    return result
  }

  rollTen(id) {
    if (!this._account_db.addJewels(id, this._roll_cost * 10)) {
      throw new ApiException(400, 'Not Enough Gems!')
    }

    let rarity_total = 0
    let ten_pull = []
    for(let i = 0; i < 9; i++) {
      const pull = this.roll(id)
      rarity_total += pull.rarity
      ten_pull.push(pull)
    }

    let pity_offset = 0
    if (rarity_total < 10) {
      console.log('PITY ACTIVATED')
      pity_offset = this._rarity_one
    }

    ten_pull.push(this.roll(id, pity_offset))
    return ten_pull
  }
}
