const server_id = 'lmfao2'
const player_id = 'abcacb'

import UserDatabase from '../../lib/databases/user_database.js'
const user_db = new UserDatabase(server_id)
user_db.initDatabase()
user_db.reset()

user_db.addUser(player_id)
user_db.setJewels(player_id, 1500)

import pullTen from '../../lib/gacha/pull_ten.js'
import pull from '../../lib/gacha/pull.js'

console.log(pullTen(player_id, server_id, 20014))

user_db.setJewels(player_id, 1500)
console.log(pull(player_id, server_id, 20014))

