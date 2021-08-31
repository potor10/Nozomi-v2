// Dependencies 
const MasterDatabase = require('./master_database')
const AccountDatabase = require('./account_database')

// Manages Gacha
module.exports = class Gacha {
  constructor() {
    this._master_db = new MasterDatabase()
    this._account_db = new AccountDatabase()

    this._rarity_one = 795
    this._rarity_two = 975
    this._rarity_three = 1000

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

  roll(id) {  
    if (!this._account_db.addJewels(id, this._roll_cost)) {
      throw 'Not Enough Gems!'
    }

    return this._master_db.getRandomUnit(this.rarity()).unit_id
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
      ten_pull.push(this._master_db.getRandomUnit(rarity).unit_id)
    }

    let pity_amount = 0
    if (rarity_total < 10) {
      console.log('PITY ACTIVATED')
      pity_amount = this._rarity_one
    }

    ten_pull.push(this._master_db.getRandomUnit(this.rarity(pity_amount)).unit_id)
    return ten_pull
  }
}
