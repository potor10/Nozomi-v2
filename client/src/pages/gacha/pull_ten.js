

const pullTen = async (server_id, gacha_id) => {
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
      server_id: server_id
    })
  }

  console.log('hello!')
  const res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/gacha/pull_ten`, fetch_options)
  if (res.status === 200) {
    let pull_result = await res.json()
    document.getElementById('result').innerHTML = JSON.stringify(pull_result)
  } else {
    document.getElementById('result').innerHTML = 'not enough gems!!!'
  }
}

export default pullTen