// Dependencies 
const MasterDatabase = require('../lib/master_database')
const master_db = new MasterDatabase()

const AccountDatabase = require('../lib/account_database')
const account_db = new AccountDatabase('883062752736858153', master_db)

account_db.addJewels('154775062178824192', 5000000)