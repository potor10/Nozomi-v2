import TicketDatabase from '../../../../lib/databases/ticket_database.js'

const ticketsController = async (req, res) => {
  if (req.session.login_status === true) {
    const ticket_db = new TicketDatabase()
    try {
      const tickets = ticket_db.getTickets(req.session.user_data.id)
      res.status(200).json(tickets)
    } catch (e) {
      console.log(e)
      res.status(e.getStatus()).send(e.getErrorMessage())
    }
    ticket_db.close()
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}

export default ticketsController
