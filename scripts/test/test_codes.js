import CodeDatabase from '../../lib/databases/code_database.js'
const code_db = new CodeDatabase()
code_db.initDatabase()
code_db.resetDatabase()

let code1 = code_db.addCode('jewels', 10000)
console.log(code1)

const server_id = 'lmfao3'
const discord_id = 'bbb23'
import UserDatabase from '../../lib/databases/user_database.js'
const user_db = new UserDatabase(server_id)
user_db.initDatabase()
user_db.resetDatabase()

import RedeemDatabase from '../../lib/databases/redeem_database.js'
const redeem_db = new RedeemDatabase(server_id)
redeem_db.initDatabase()
redeem_db.resetDatabase()

user_db.addUser(discord_id)

console.log(user_db.getUser(discord_id))
console.log(redeem_db.getRedeem(code1, discord_id))

import redeemCode from '../../lib/redeem/redeem_code.js'
console.log(redeemCode(code1, discord_id, server_id))
console.log(redeemCode(code1, discord_id, server_id))

console.log(user_db.getUser(discord_id))
console.log(redeem_db.getRedeem(code1, discord_id))

import CollectionDatabase from '../../lib/databases/collection_database.js'
const collection_db = new CollectionDatabase(server_id)
collection_db.initDatabase()
collection_db.resetDatabase()

console.log(collection_db.getAllUnits(discord_id))

let code2 = code_db.addCode('unit', 100301, null, 999999)
console.log(code2)

console.log(redeemCode(code2, discord_id, server_id))
console.log(redeemCode(code2, discord_id, server_id))

console.log(collection_db.getAllUnits(discord_id))