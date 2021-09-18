

const exchangeUnit = async (component, unit_id) => {
  const fetch_options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      server_id: component.props.server_data.id,
      unit_id: unit_id
    })
  }

  const res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/exchange/unit`, fetch_options)
  if (res.status === 200) {
    let exchange_data = await res.json()

    let user = component.props.user_stats
    user.exchange_points -= 300
    user.amulets += exchange_data.amulets_obtained

    component.props.set_user(user)

    component.setState({
      ...exchange_data,
      exchange_loaded: 1
    })
  } else {
    component.setState({ 
      exchange_loaded: 0 
    })
  }
}

export default exchangeUnit