

const pullTen = async (component, gacha_id) => {
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
      server_id: component.props.server_data.id 
    })
  }

  console.log('hello!')
  const res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/gacha/pull_ten`, fetch_options)
  if (res.status === 200) {
    let pull_ten_data = await res.json()

    let has_three = false
    for(let i = 0; i < pull_ten_data.pull_result.length; i++) {
      if (pull_ten_data.pull_result[i].rarity === 3) {
        has_three = true
        break
      }
    }

    const timeout = setTimeout(() => {component.setState({
        show_animation: false
      })}, 6640)
    
    component.setState({ 
      loaded_gif: (has_three) ? component.state.gif_lucky : component.state.gif_unlucky,
      pull_loaded: 1,
      ...pull_ten_data,
      timeout: timeout
    })

    return pull_ten_data
  } else {
    component.setState({ pull_loaded: 0 })
    return {}
  }
}

export default pullTen