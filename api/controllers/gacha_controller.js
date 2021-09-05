// Dependencies
const MasterDatabase = require('../../lib/master_database')
const master_db = new MasterDatabase()

const AccountDatabase = require('../../lib/account_database')
const CollectionDatabase = require('../../lib/collection_database')
const Gacha = require('../../lib/gacha')

exports.pull_ten = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.body.server_id] !== undefined) {
      const account_db = new AccountDatabase(req.body.server_id, master_db)
      const collection_db = new CollectionDatabase(req.body.server_id, master_db, account_db)
      const gacha = new Gacha(req.body.server_id, master_db, account_db, collection_db)
      
      try {
        const pull_result = gacha.pullTen(req.session.user_data.id)
        res.status(200).json(pull_result)
      } catch (e) {
        console.log(e)
        res.status(e.getStatus()).send(e.getErrorMessage())
      }
      account_db.close()
      collection_db.close()
    } else {
      res.status(400).send('Please Select A Valid Server')
    }
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}