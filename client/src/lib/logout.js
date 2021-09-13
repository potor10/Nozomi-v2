
// Makes a fetch request to try to log out the user
const logout = () => {
  fetch(`${process.env.REACT_APP_WEB_URL}/api/user/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
    .then(res => {
      console.log(res)
      localStorage.removeItem('discord_user')
      localStorage.removeItem('server_data')
      if (res.status === 200) window.history.pushState({}, null, '/')
    })
}

export default logout