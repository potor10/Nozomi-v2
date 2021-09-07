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
const my_pull = pull(player_id, server_id, 20014)
console.log(my_pull)

import calculateStats from '../../lib/character/stats/calculate_stats.js'

console.log(calculateStats(player_id, server_id, my_pull.unit_id))

import CollectionDatabase from '../../lib/databases/collection_database.js'
const collection_db = new CollectionDatabase(server_id)

collection_db.getAllUnits(player_id).forEach(unit => {
  calculateStats(player_id, server_id, unit.unit_id)
})