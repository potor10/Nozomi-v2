const character = async (server_id, unit_id) => {
  const fetch_options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  }

  const character_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/character/get/${server_id}/${unit_id}`, fetch_options)
  if (character_res.status === 200) {
    const character_data = await character_res.json()
    console.log(character_data)
    this.setState({ character_loaded: 1, character: character_data })
  } else {
    this.setState({ character_loaded: 0 })
  }
}

export default character
