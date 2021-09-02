
const logout = () => {
  fetch(`http://localhost:8080/discord/logout`, {
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
      if (res.status === 200) window.location.href = '/'
    })
}

export default logout