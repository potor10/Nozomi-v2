
const fetchTickets = async (component) => {
  const fetch_options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  }

  const tickets_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/support/tickets`, fetch_options)
  if (tickets_res.status === 200) {
    const tickets = await tickets_res.json()
    console.log(tickets)

    component.setState({ 
      tickets: tickets,
      tickets_loaded: 1
    })
  } else {
    console.log('FAIL')
    component.setState({ tickets_loaded: 0 })
  }
}

export default fetchTickets
