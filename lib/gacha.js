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

    this._pull_cost = -150
  }

  rarity(pity=false) {
    const pull = Math.floor(Math.random() * this._rarity_three)
    let rarity = 3
    if (pull < this._rarity_one && !pity) rarity = 1
    else if (pull < this._rarity_two) rarity = 2

    return rarity
  }

  pull(id, pity=false) {
    const rarity = this.rarity(pity)
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

  pullTen(id) {
    if (!this._account_db.addJewels(id, this._pull_cost * 10)) {
      throw new ApiException(400, 'Not Enough Gems!')
    }

    let rarity_total = 0
    let ten_pull = []
    for(let i = 0; i < 9; i++) {
      const pull = this.pull(id)
      rarity_total += pull.rarity
      ten_pull.push(pull)
    }

    let pity = false
    if (rarity_total < 10) {
      console.log('PITY ACTIVATED')
      pity = true
    }

    ten_pull.push(this.pull(id, pity))
    return ten_pull
  }
}
