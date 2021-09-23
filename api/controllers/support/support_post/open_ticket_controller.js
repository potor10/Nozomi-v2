import TicketDatabase from '../../../../lib/databases/ticket_database.js'

import currentTime from '../../../../lib/time/current_time.js'

const openTicketController = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.body.server_id] !== undefined) {
      const ticket_db = new TicketDatabase()
      try {
        ticket_db.addTicket(req.session.user_data.id, req.body.server_id, req.body.ticket_title,
          req.body.ticket_description, req.body.contact, currentTime())
        res.status(200).json({ success: true })
      } catch (e) {
        console.log(e)
        res.status(e.getStatus()).send(e.getErrorMessage())
      }
      ticket_db.close()
    } else {
      res.status(400).send('Please Select A Valid Server')
    }
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}

export default openTicketController
