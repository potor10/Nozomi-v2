import React from 'react'
import { Button } from 'react-bootstrap'

const pullTen = async (server_data) => {
  const fetch_options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({server_id: server_data.id})
  }

  console.log('hello!')
  const res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/gacha/pullten`, fetch_options)
  if (res.status === 200) {
    let pull_result = await res.json()
    document.getElementById('result').innerHTML = JSON.stringify(pull_result)
  } else {
    document.getElementById('result').innerHTML = 'not enough gems!!!'
  }
}

const Gacha = ({ server_data }) => {
  return (
    <>
      <Button onClick={() => pullTen(server_data)}>Pull x10</Button>
      <p id='result'>stuff should be here</p>
    </>
  )
}

export default Gacha