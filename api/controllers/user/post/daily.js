// Function Imports
import dailyClaim from '../../../../lib/user/daily.js'

/**
 * Requests the nozomi bot user stats profile information
 * @param req the request route parameter
 * @param res the response rout parameter
 */
const daily = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.body.server_id] !== undefined) {
      console.log(req.session.user_data.id)
      if (dailyClaim(req.session.user_data.id, req.body.server_id)) res.status(200).json({ success: true })
      else res.status(200).json({ success: false })
    } else {
      console.log('aww man')
      res.status(400).send('Please Select A Valid Server')
    }
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}

export default daily