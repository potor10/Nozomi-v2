const server_id = 'lmfao'
const id = 'abcacb'

// Dependencies 
import MasterDatabase from '../../lib/databases/master_database.js'
const master_db = new MasterDatabase()

import UserDatabase from '../../lib/databases/user_database.js'
const user_db = new UserDatabase(server_id)
user_db.initDatabase()
user_db.resetDatabase()

import CollectionDatabase from '../../lib/databases/collection_database.js'
const collection_db = new CollectionDatabase(server_id)
collection_db.initDatabase()
collection_db.resetDatabase()


user_db.addUser(id)
user_db.setJewels(id, 150000)

import daily from '../../lib/account/daily.js'
daily(id, server_id)

import addExp from '../../lib/account/add_exp.js'
addExp(id, server_id)
addExp(id, server_id)
addExp(id, server_id)
addExp(id, server_id)
addExp(id, server_id)
addExp(id, server_id)

import pullTen from '../../lib/gacha/pull_ten.js'
pullTen(id, server_id, 20014)
let result = pullTen(id, server_id, 20014)

let formatted_pull = []
result.forEach(pull => {
  formatted_pull.push({
    name: pull.unit_name,
    rarity: pull.rarity,
    dupe: pull.dupe
  })
})

console.log(formatted_pull)

import equip from '../../lib/character/upgrade/equip.js'
equip(id, server_id, result[0].unit_id, 1)
console.log(collection_db.getUnit(id, result[0].unit_id))
equip(id, server_id, result[0].unit_id, 2)
console.log(collection_db.getUnit(id, result[0].unit_id))
equip(id, server_id, result[0].unit_id, 3)
console.log(collection_db.getUnit(id, result[0].unit_id))
equip(id, server_id, result[0].unit_id, 4)
console.log(collection_db.getUnit(id, result[0].unit_id))
equip(id, server_id, result[0].unit_id, 5)
console.log(collection_db.getUnit(id, result[0].unit_id))
equip(id, server_id, result[0].unit_id, 6)
console.log(collection_db.getUnit(id, result[0].unit_id))

import rankUp from '../../lib/character/upgrade/rank_up.js'
console.log(rankUp(id, server_id, result[0].unit_id))
console.log('---after rank up---')
console.log(collection_db.getUnit(id, result[0].unit_id))

console.log(user_db.getUser(id).amulets)
user_db.setAmulets(id, 50000)
user_db.setMana(id, 1000000)
console.log(user_db.getUser(id).mana)

import ascend from '../../lib/character/upgrade/ascend.js'
try {
  ascend(id, server_id, result[0].unit_id)
  ascend(id, server_id, result[0].unit_id)
  ascend(id, server_id, result[0].unit_id)
} catch (e) {
  console.log(e)
  console.log('max rarity?')
}

import levelUp from '../../lib/character/upgrade/level_up.js'

levelUp(id, server_id, result[0].unit_id)
levelUp(id, server_id, result[0].unit_id, true)

import skillUp from '../../lib/character/upgrade/skill_up.js'

skillUp(id, server_id, result[0].unit_id, 'union_burst')
skillUp(id, server_id, result[0].unit_id, 'main_skill_1')
skillUp(id, server_id, result[0].unit_id, 'union_burst', true)

import bondUp from '../../lib/character/upgrade/bond_up.js'
bondUp(id, server_id, result[0].unit_id)
bondUp(id, server_id, result[0].unit_id)
bondUp(id, server_id, result[0].unit_id)

user_db.getUser('blegh')

// console.log(collection_db.getAllSkillEffects(id, result[0].id))
// console.log(collection_db.getSkillEffect(id, result[0].id, constants.SKILL_NAMES[1]))
// console.log(collection_db.getSkillEffect(id, result[0].id, constants.SKILL_NAMES[2]))
