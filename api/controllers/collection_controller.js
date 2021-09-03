// Dependencies
const MasterDatabase = require('../../lib/master_database')
const master_db = new MasterDatabase()

const AccountDatabase = require('../../lib/account_database')
const CollectionDatabase = require('../../lib/collection_database')

exports.get_all = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.params.server_id] !== undefined) {
      const account_db = new AccountDatabase(req.params.server_id, master_db)
      const collection_db = new CollectionDatabase(req.params.server_id, master_db, account_db)
      
      try {
        const all_units = collection_db.getAllUnits(req.session.user_data.id)
        res.status(200).json(all_units)
      } catch (e) {
        console.log(e)
        res.status(e.getStatus()).send(e.getErrorMessage())
      }
    } else {
      res.status(400).send('Please Select A Valid Server')
    }
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}

exports.get = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.params.server_id] !== undefined) {
      const account_db = new AccountDatabase(req.params.server_id, master_db)
      const collection_db = new CollectionDatabase(req.params.server_id, master_db, account_db)
      
      try {
        const unit = collection_db.getUnit(req.session.user_data.id, req.params.unit_id)
        res.status(200).json(unit)
      } catch (e) {
        console.log(e)
        res.status(e.getStatus()).send(e.getErrorMessage())
      }
    } else {
      res.status(400).send('Please Select A Valid Server')
    }
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}