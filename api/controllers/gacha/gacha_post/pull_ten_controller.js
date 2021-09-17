// Function Imports
import pullTen from '../../../../lib/gacha/pull_ten.js'

/**
 * Requests the nozomi bot user stats profile information
 * @param req the request route parameter
 * @param res the response rout parameter
 */
const pullTenController = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.body.server_id] !== undefined) {
      try {
        const pull_ten_data = pullTen(req.session.user_data.id, req.body.server_id, req.body.gacha_id)
        res.status(200).json(pull_ten_data)
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

export default pullTenController