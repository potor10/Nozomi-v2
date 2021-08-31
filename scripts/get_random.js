const AccountDatabase = require('../lib/account_database')
const db = new AccountDatabase()

const CollectionDatabase = require('../lib/collection_database')
const db2 = new CollectionDatabase()

db.reset()
db2.reset()

const id = 'abcacb'
db.addAccount(id)
db.addJewels(id, 1500)

db.daily(id)

const Gacha = require('../lib/gacha')

const gacha = new Gacha()
console.log(gacha.rollTen(id))

let result = gacha.rollTen(id)
console.log(result)

db2.addEquipment(id, result[0].id, 1)
