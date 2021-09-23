import redeemCode from '../../../../lib/redeem/redeem_code.js'

const redeemCodeController = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.body.server_id] !== undefined) {
      try {
        const redeemed = redeemCode(req.body.code_hash, req.session.user_data.id)
        res.status(200).json(redeemed)
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

export default redeemCodeController
