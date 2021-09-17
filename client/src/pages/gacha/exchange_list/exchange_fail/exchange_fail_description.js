
import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

class ExchangeFailDescription extends Component {
  render() {
    console.log(this.props)

    return (
      <>
        <Table striped bordered hover variant="dark" className="uh-oh">
          <tbody>
            <tr>
              <td>Your Char Exchange Points</td>
              <td>
                <b>{this.props.user_stats.exchange_points}</b>
              </td>
            </tr>
            <tr>
              <td>Price</td>
              <td>
                <b>300</b>
              </td>
            </tr>
            <tr>
              <td>You Need</td>
              <td>
                <b>{Math.abs(this.props.user_stats.exchange_points - 300)}</b>
              </td>
            </tr>
          </tbody>
        </Table>
      </>
    )
  }
} 

export default ExchangeFailDescription