

const pull = async (server_id, gacha_id, discount) => {
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
      server_id: server_id,
      discount: discount
    })
  }

  console.log('hello!')
  const res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/gacha/pull`, fetch_options)
  if (res.status === 200) {
    let pull_result = await res.json()
    document.getElementById('result').innerHTML = `${pull_result.rarity} ${pull_result.unit_name}`
  } else {
    document.getElementById('result').innerHTML = 'not enough gems!!!'
  }
}

export default pull