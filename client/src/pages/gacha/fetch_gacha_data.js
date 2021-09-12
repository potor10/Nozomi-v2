
const fetchGachaData = async (component) => {
  const fetch_options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  }

  const gacha_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/gacha/banner/${component.props.server_data.id}`, 
    fetch_options)
  if (gacha_res.status === 200) {
    const gacha_data = await gacha_res.json()
    console.log(gacha_data)

    component.setState({ 
      ...gacha_data,
      gacha_loaded: 1
    })
  } else {
    console.log('FAIL')
    component.setState({ gacha_loaded: 0 })
  }
}

export default fetchGachaData
