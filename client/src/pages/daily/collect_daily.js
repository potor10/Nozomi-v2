const collectDaily = async (component, server_id) => {
  const fetch_options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      server_id: server_id
    })
  }

  const res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/user/daily`, fetch_options)
  if (res.status === 200) {
    const daily_data = await res.json()
    component.setState({ 
      daily_loaded: 1,
      ...daily_data
    })

    if (daily_data.success) {
      let user = component.props.user_stats
      user.mana += daily_data.mana_obtained
      user.jewels += daily_data.jewels_obtained
      component.props.set_user(user)
    }
  } else {
    component.setState({ daily_loaded: 0 })
  }
}

export default collectDaily