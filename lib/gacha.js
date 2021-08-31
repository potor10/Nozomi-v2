// Dependencies 
const MasterDatabase = require('./master_database')
const AccountDatabase = require('./account_database')
const CollectionDatabase = require('./collection_database')

// Manages Gacha
module.exports = class Gacha {
  constructor() {
    this._master_db = new MasterDatabase()
    this._account_db = new AccountDatabase()
    this._collection_db = new CollectionDatabase()

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
      throw 'Not Enough Gems!'
    }

    let rarity_total = 0
    let ten_pull = []
    for(let i = 0; i < 9; i++) {
      const rarity = this.rarity()
      rarity_total += rarity
      ten_pull.push(this.roll(id))
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
