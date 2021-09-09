// Import Functions

/**
 * Makes a fetch request to grab the user's available discord guilds
 * @param {Class} component the react component making the request
 * @return {boolean} state of the request
 */
const discordGuilds = async (component) => {
  const fetch_options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  }

  const guilds_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/user/guilds`, fetch_options)
  console.log('hello')
  if (guilds_res.status === 200) {
    const discord_guilds = await guilds_res.json()
    console.log('awesome')
    component.setState({ discord_guilds: discord_guilds, servers_loaded: 1 })
    return true
  } else {
    console.log('not')
    component.setState({ servers_loaded: 0 })
    return false
  }
}

export default discordGuilds