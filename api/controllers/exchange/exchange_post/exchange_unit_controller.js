// Function Imports
import exchangeUnit from '../../../../lib/gacha/exchange_unit.js'

/**
 * Requests the nozomi bot user stats profile information
 * @param req the request route parameter
 * @param res the response rout parameter
 */
const exchangeUnitController = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.body.server_id] !== undefined) {
      try {
        const exchange_result = exchangeUnit(req.session.user_data.id, req.body.server_id, req.body.unit_id)
        res.status(200).json(exchange_result)
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

export default exchangeUnitController