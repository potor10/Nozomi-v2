// Module Imports
import UserDatabase from "../../../../lib/databases/user_database.js"
import MasterDatabase from "../../../../lib/databases/master_database.js"

/**
 * Requests the nozomi bot user stats profile information
 * @param req the request route parameter
 * @param res the response rout parameter
 */
const statsController = async (req, res) => {
  if (req.session.login_status === true) {
    console.log(req.params.server_id)
    if (req.session.mutual_guilds[req.params.server_id] !== undefined) {
      const master_db = new MasterDatabase()
      const user_db = new UserDatabase(req.params.server_id)
      try {
        const user_info = { 
          experience_team: master_db.getExperienceTeam(),
          user: user_db.getUser(req.session.user_data.id)
        }
        res.status(200).json(user_info)
      } catch (e) {
        console.log(e)
        res.status(e.getStatus()).send(e.getErrorMessage())
      }
      user_db.close()
    } else {
      res.status(400).send('Please Select A Valid Server')
    }
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}

export default statsController
