

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
    let pull_result = await res.json()
    component.setState({ pull_result: pull_result, pull_loaded: 1})
    setTimeout(() => {component.setState({
      show_animation: false
    })}, 3000)
  } else {
    component.setState({ pull_loaded: 0 })
  }
}

export default pullTen