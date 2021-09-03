const server_id = 'lmfao'

// Dependencies 
const MasterDatabase = require('../lib/master_database')
const master_db = new MasterDatabase()

const AccountDatabase = require('../lib/account_database')
const account_db = new AccountDatabase(server_id, master_db)
account_db.reset()

const CollectionDatabase = require('../lib/collection_database')
const collection_db = new CollectionDatabase(server_id, master_db, account_db)
collection_db.reset()

const id = 'abcacb'

account_db.addAccount(id)
account_db.addJewels(id, 1500)
account_db.daily(id)

account_db.addExp(id, 500000000)

const Gacha = require('../lib/gacha')
const gacha = new Gacha(server_id, master_db, account_db, collection_db)

console.log(gacha.pullTen(id))

let result = gacha.pullTen(id)
console.log(result)

collection_db.addEquipment(id, result[0].id, 1)
collection_db.addEquipment(id, result[0].id, 2)
collection_db.addEquipment(id, result[0].id, 3)
collection_db.addEquipment(id, result[0].id, 4)
collection_db.addEquipment(id, result[0].id, 5)
collection_db.addEquipment(id, result[0].id, 6)
collection_db.rankUp(id, result[0].id)
// collection_db.addEquipment(id, result[0].id, 1)

console.log(account_db.getUser(id).amulets)
account_db.addAmulets(id, 50000)
account_db.addMana(id, 10000000)

try {
  collection_db.increaseRarity(id, result[0].id)
  collection_db.increaseRarity(id, result[0].id)
  collection_db.increaseRarity(id, result[0].id)
  collection_db.increaseRarity(id, result[0].id)
} catch (e) {

}

console.log(collection_db.levelUpCost(id, result[0].id))
collection_db.levelUpUnit(id, result[0].id)
console.log(collection_db.levelUpCost(id, result[0].id, true))
collection_db.levelUpUnit(id, result[0].id, true)

collection_db.levelUpSkill(id, result[0].id, 101)
collection_db.levelUpSkill(id, result[0].id, 201)

collection_db.levelUpSkill(id, result[0].id, 101, true)

account_db.addJewels(id, 1500)
collection_db.levelUpBond(id, result[0].id)
collection_db.levelUpBond(id, result[0].id)
collection_db.levelUpBond(id, result[0].id)

account_db.getUser('blegh')

