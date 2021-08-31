const AccountDatabase = require('../lib/account_database')
const db = new AccountDatabase()

db.reset()

const id = 'abcacb'
db.addAccount(id)
db.addJewels(id, 1500)

db.daily(id)

const Gacha = require('../lib/gacha')

const gacha = new Gacha()
console.log(gacha.rollTen(id))
console.log(gacha.rollTen(id))
console.log(gacha.rollTen(id))