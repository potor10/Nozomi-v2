import React from 'react'
import { Button } from 'react-bootstrap'

const pullTen = async (server_data) => {
  const fetch_options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  }

  console.log('hello!')
  const res = await fetch(`${process.env.REACT_APP_WEB_URL}/gacha/pullten/${server_data.id}`, fetch_options)
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