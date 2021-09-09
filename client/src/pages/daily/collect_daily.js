const collectDaily = async (component, server_id) => {
  const fetch_options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      server_id: server_id
    })
  }

  const res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/user/daily`, fetch_options)
  if (res.status === 200 && (await res.json()).success) {
    component.setState({ daily: 1 })
  } else {
    component.setState({ daily: 0 })
  }
}

export default collectDaily