const server_id = 'lmfao2'
const player_id = 'abcacb'

import UserDatabase from '../../lib/databases/user_database.js'
const user_db = new UserDatabase(server_id)
user_db.initDatabase()
user_db.resetDatabase()

user_db.addUser(player_id)
user_db.setJewels(player_id, 1500)

import pullTen from '../../lib/gacha/pull_ten.js'
import pull from '../../lib/gacha/pull.js'

// Demo Pull
const my_pull = pullTen(player_id, server_id, 20014)
const formatted_pull = []

my_pull.forEach(pull => {
  formatted_pull.push({
    name: pull.unit_name,
    rarity: pull.rarity
  })
})

console.log(formatted_pull)

// Test Rate - 100 pull
let pull_amt = 100
let rate = [0, 0, 0]
user_db.setJewels(player_id, 150 * pull_amt)
for(let i = 0; i < pull_amt; i++) {
  let rate_pull = pull(player_id, server_id, 20014)
  rate[rate_pull.rarity - 1] += 1
}

console.log(`--- Rarity Test ---`)
console.log(`1 Star: ${(rate[0]/pull_amt) * 100} %`)
console.log(`2 Star: ${(rate[1]/pull_amt) * 100} %`)
console.log(`3 Star: ${(rate[2]/pull_amt) * 100} %`)

// Test Rate - Rate Up 100 pull
pull_amt = 100
rate = [0, 0, 0]

let rate_up = [0, 0]

user_db.setJewels(player_id, 150 * pull_amt)
for(let i = 0; i < pull_amt; i++) {
  let rate_pull = pull(player_id, server_id, 30014)

  rate[rate_pull.rarity - 1] += 1
  if (rate_pull.rarity === 3 && rate_pull.unit_id === 103701) {
    rate_up[0] += 1
  } else if (rate_pull.rarity === 3) {
    rate_up[1] += 1
  }
}

console.log(`--- Rate Up Test ---`)
console.log(`1 Star: ${(rate[0]/pull_amt) * 100} %`)
console.log(`2 Star: ${(rate[1]/pull_amt) * 100} %`)
console.log(`3 Star: ${(rate[2]/pull_amt) * 100} %`)

const total_3 = rate_up[0] + rate_up[1]
console.log(`Rate Up: ${(rate_up[0]/total_3) * 100} %`)
console.log(`Else: ${(rate_up[1]/total_3) * 100} %`)