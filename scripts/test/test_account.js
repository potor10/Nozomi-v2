const server_id = 'lmfao2'
const player_id = 'abcacb'

import UserDatabase from '../../lib/databases/user_database.js'
const user_db = new UserDatabase(server_id)
user_db.initDatabase()
user_db.reset()

user_db.addUser(player_id)
user_db.setJewels(player_id, 1500)

import daily from '../../lib/account/daily.js'
import addExp from '../../lib/account/add_exp.js'

console.log(daily(player_id, server_id))
console.log(daily(player_id, server_id))
addExp(player_id, server_id)
addExp(player_id, server_id)
addExp(player_id, server_id)
addExp(player_id, server_id)
addExp(player_id, server_id)
console.log(user_db.getUser(player_id))