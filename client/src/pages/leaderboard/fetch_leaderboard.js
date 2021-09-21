const fetchLeaderboard = async (component, server_id) => {
  const fetch_options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  }

  const leaderboard_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/user/leaderboard/${server_id}`, fetch_options)
  if (leaderboard_res.status === 200) {
    
    let leaderboard = await leaderboard_res.json()
  
    component.setState({ 
      leaderboard_loaded: 1,
      leaderboard: leaderboard
    })
  } else {
    console.log('goodbye')
    component.setState({ leaderboard_loaded: 0 })
  }
}

export default fetchLeaderboard