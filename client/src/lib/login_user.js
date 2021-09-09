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


/**
 * Makes a fetch request to attempt to log in the user with their provided discord OAuth code
 * @param {Class} component that we will be calling this code from 
 * @param {String} code is the OAuth code granted by a successful discord sign in 
 * @return {boolean} state of the login request
 */
const loginUser = async (component, code) => {
  console.log(component.state.login_status)
  if (component.state.login_status !== 1) {
    console.log('logging in?')
    const fetch_options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({code: code})
    }

    let login_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/user/login`, fetch_options)
    if (login_res.status === 200 && (await login_res.json()).success) {
      if (localStorage.getItem('discord_user') === null) {
        // Get The Discord User
        const discord_user = await discordInfo()
        if (discord_user !== undefined) {
          localStorage.setItem('discord_user', JSON.stringify(discord_user))
          component.setState({ login_status: 1, discord_user: discord_user })
        } else {
          component.setState({ login_status: 0 })
        }
      } else {
        component.setState({ login_status: 1 })
      }
      return true
    } else {
      // Remove possible existing data in storage
      localStorage.removeItem('discord_user')
      localStorage.removeItem('server_data')
      component.setState({ login_status: 0 })
      return false
    }
  }
  return false
  console.log(component.state.discord_user)
}

export default loginUser