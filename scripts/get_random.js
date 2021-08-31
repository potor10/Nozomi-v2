const MasterDatabase = require('../lib/master_database')

const master_db = new MasterDatabase()
console.log(master_db.getRandomUnit(3))