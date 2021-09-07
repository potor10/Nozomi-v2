/**
 * Makes a fetch request to grab the user's discord information
 * @return {Object} the user info we are requesting
 */
const discordInfo = async () => {
  const fetch_options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  }

  const discord_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/user/profile`, fetch_options)
  if (discord_res.status === 200) {
    const discord_user = await discord_res.json()
    return discord_user
  } else {
    return undefined
  }
}

export default discordInfo

