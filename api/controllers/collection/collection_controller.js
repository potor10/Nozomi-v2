// Dependencies
const MasterDatabase = require('../../lib/master_database')
const master_db = new MasterDatabase()

const AccountDatabase = require('../../lib/account_database')
const CollectionDatabase = require('../../../lib/databases/collection_database')



exports.equipment_cost = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.params.server_id] !== undefined) {
      const account_db = new AccountDatabase(req.params.server_id, master_db)
      const collection_db = new CollectionDatabase(req.params.server_id, master_db, account_db)
      let equip_data = {
        equippable: false,
        cost: 0
      }
      try {
        const cost = collection_db.equipCost(req.session.user_data.id, req.params.unit_id, req.params.equip_idx)
        equip_data.equippable = true
        equip_data.cost = cost

        res.status(200).json(equip_data)
      } catch (e) {
        if (e.getStatus() === 400 ) {
          res.status(200).json(equip_data)
        } else {
          console.log(e)
          res.status(e.getStatus()).send(e.getErrorMessage())
        }
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



exports.get_skill = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.params.server_id] !== undefined) {
      const account_db = new AccountDatabase(req.params.server_id, master_db)
      const collection_db = new CollectionDatabase(req.params.server_id, master_db, account_db)
      try {
        const skill = collection_db.getSkillEffect(req.session.user_data.id, req.params.unit_id, req.params.skill_name)
        res.status(200).json(skill)
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

exports.get_skill_cost = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.params.server_id] !== undefined) {
      const account_db = new AccountDatabase(req.params.server_id, master_db)
      const collection_db = new CollectionDatabase(req.params.server_id, master_db, account_db)
      try {
        const skill_level_cost = collection_db.levelUpSkillCost(req.session.user_data.id, 
          req.params.unit_id, req.params.skill_name, false)
        const skill_max_cost = collection_db.levelUpSkillCost(req.session.user_data.id, 
          req.params.unit_id, req.params.skill_name, true)
        const skill_cost = {
          skill_level_cost: skill_level_cost,
          skill_max_cost: skill_max_cost
        }
        res.status(200).json(skill_cost)
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

exports.get_unit_level_cost = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.params.server_id] !== undefined) {
      const account_db = new AccountDatabase(req.params.server_id, master_db)
      const collection_db = new CollectionDatabase(req.params.server_id, master_db, account_db)
      try {
        const unit_level_cost = collection_db.levelUpCost(req.session.user_data.id, req.params.unit_id, false)
        const unit_max_cost = collection_db.levelUpCost(req.session.user_data.id, req.params.unit_id, true)
        const level_cost = {
          unit_level_cost: unit_level_cost,
          unit_max_cost: unit_max_cost
        }
        res.status(200).json(level_cost)
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

exports.get_ascension_cost = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.params.server_id] !== undefined) {
      const account_db = new AccountDatabase(req.params.server_id, master_db)
      const collection_db = new CollectionDatabase(req.params.server_id, master_db, account_db)
      try {
        const cost = collection_db.ascensionCost(req.session.user_data.id, req.params.unit_id)
        res.status(200).json(cost)
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


