import React from 'react'
import { Button } from 'react-bootstrap'

import pullTen from './pull_ten'

const Gacha = ({ user_data, server_data }) => {
  return (
    <>
      <Button 
        onClick={() => pullTen(server_data.id, 20014)}>
        Pull x10 on 20014
      </Button>
      <p 
        id='result'>
        stuff should be here
      </p>
    </>
  )
}

export default Gacha