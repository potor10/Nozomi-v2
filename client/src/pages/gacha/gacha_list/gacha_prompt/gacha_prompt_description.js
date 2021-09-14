
import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

class GachaPromptDescription extends Component {
  render() {
    console.log(this.props)

    return (
      <>
        <Table striped bordered hover variant="dark" className="price-here">
          <tbody>
            <tr>
              <td>Your Jewels</td>
              <td>
                <b>{this.props.user.jewels}</b>
                <img className="icon-sm" src={"/images/assets/jewel.png"} />
              </td>
            </tr>
            <tr>
              <td>Price</td>
              <td>
                <b>{this.props.price}</b>
                <img className="icon-sm" src={"/images/assets/jewel.png"} />
              </td>
            </tr>
          </tbody>
        </Table>
      </>
    )
  }
} 

export default GachaPromptDescription