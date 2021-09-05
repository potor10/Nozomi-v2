// Dependencies
const MasterDatabase = require('../../lib/master_database')
const master_db = new MasterDatabase()

exports.exp = (req, res) => {
  if (req.session.login_status === true) {
    const exp_data = {
      exp_current_level: master_db.getExperienceTeamFromLevel(req.params.level).total_exp,
      exp_next_level: master_db.getExperienceTeamFromLevel(parseInt(req.params.level) + 1).total_exp
    }
    res.status(200).json(exp_data)
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}

exports.needed_equipment = (req, res) => {
  if (req.session.login_status === true) {
    try {
      const equipment_needed = master_db.getUnitPromotion(req.params.unit_id, req.params.promotion_level)
      res.status(200).json(equipment_needed)
    } catch (e) {
      res.status(e.getStatus()).send(e.getErrorMessage())
    }
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}

exports.get_equipment = (req, res) => {
  if (req.session.login_status === true) {
    try {
      const equipment = master_db.getMaxedEquipment(req.params.equipment_id)
      res.status(200).json(equipment)
    } catch (e) {
      console.log(e)
      res.status(200).json({ equipment_id: 999999 })
    }
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}

exports.max_ascension = (req, res) => {
  if (req.session.login_status === true) {
    try {
      const max_ascension = master_db.getMaxAscension(req.params.unit_id)
      res.status(200).json(max_ascension)
    } catch (e) {
      res.status(e.getStatus()).send(e.getErrorMessage())
    }
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}