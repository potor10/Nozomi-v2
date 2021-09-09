import ascend from '../../../../lib/character/upgrade/ascend.js'

const ascendController = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.body.server_id] !== undefined) {
      try {
        ascend(req.session.user_data.id, req.body.server_id, req.body.unit_id)
        res.status(200).json({ success: true })
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

export default ascendController
