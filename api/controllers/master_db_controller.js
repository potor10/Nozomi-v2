// Dependencies
const MasterDatabase = require('../../lib/master_database')
const master_db = new MasterDatabase()

exports.exp = (req, res) => {
  if (req.session.login_status === true) {
    const exp_data = {
      exp_current_level: master_db.getExperienceTeamFromLevel(req.params.level).total_exp,
      exp_next_level: master_db.getExperienceTeamFromLevel(req.params.level + 1).total_exp
    }

    res.status(200).json(exp_data)
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}