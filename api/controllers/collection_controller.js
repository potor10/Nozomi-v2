// Dependencies
const MasterDatabase = require('../../lib/master_database')
const master_db = new MasterDatabase()

const AccountDatabase = require('../../lib/account_database')
const CollectionDatabase = require('../../lib/collection_database')

exports.get_all_units = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.params.server_id] !== undefined) {
      const account_db = new AccountDatabase(req.params.server_id, master_db)
      const collection_db = new CollectionDatabase(req.params.server_id, master_db, account_db)
      try {
        const all_units = collection_db.getAllUnits(req.session.user_data.id, parseInt(req.params.sort_id))
        res.status(200).json(all_units)
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

exports.get_unit = async (req, res) => {
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
      account_db.close()
      collection_db.close()
    } else {
      res.status(400).send('Please Select A Valid Server')
    }
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}

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

exports.equip_equipment = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.params.server_id] !== undefined) {
      const account_db = new AccountDatabase(req.params.server_id, master_db)
      const collection_db = new CollectionDatabase(req.params.server_id, master_db, account_db)
      try {
        collection_db.equipEquipment(req.session.user_data.id, req.params.unit_id, req.params.equip_idx)
        res.status(200).json({ success: true})
      } catch (e) {
        if (e.getStatus() === 400) {
          const equip_result = ({ success: false, description: e.getErrorMessage() })
          console.log(equip_result)
          res.status(200).json(equip_result)
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

exports.rank_up = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.params.server_id] !== undefined) {
      const account_db = new AccountDatabase(req.params.server_id, master_db)
      const collection_db = new CollectionDatabase(req.params.server_id, master_db, account_db)
      try {
        collection_db.rankUp(req.session.user_data.id, req.params.unit_id)
        res.status(200).send('Success')
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

exports.rank_up = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.params.server_id] !== undefined) {
      const account_db = new AccountDatabase(req.params.server_id, master_db)
      const collection_db = new CollectionDatabase(req.params.server_id, master_db, account_db)
      try {
        collection_db.rankUp(req.session.user_data.id, req.params.unit_id)
        res.status(200).send('Success')
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

exports.get_all_skills = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.params.server_id] !== undefined) {
      const account_db = new AccountDatabase(req.params.server_id, master_db)
      const collection_db = new CollectionDatabase(req.params.server_id, master_db, account_db)
      try {
        const skills = collection_db.getAllSkillEffects(req.session.user_data.id, req.params.unit_id)
        res.status(200).json(skills)
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


