

const pull = async (component, gacha_id, discount) => {
  const fetch_options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      gacha_id: gacha_id,
      server_id: component.props.server_data.id,
      discount: discount
    })
  }

  console.log('hello!')
  const res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/gacha/pull`, fetch_options)
  if (res.status === 200) {
    let pull_data = await res.json()

    const timeout = setTimeout(() => {component.setState({
        show_animation: false
      })}, 6640)

    component.setState({
      loaded_gif: (pull_data.pull_result[0].rarity === 3) ? component.state.gif_lucky : component.state.gif_unlucky,
      ...pull_data,
      pull_loaded: 1,
      timeout: timeout
    })

    return pull_data
  } else {
    component.setState({ pull_loaded: 0 })
    return {}
  }
}

export default pull