import { Table } from 'react-bootstrap'
import React, { Component } from 'react'

import styles from './fail_description.module.css'

class FailDescription extends Component {
  render() {
    return (
      <Table striped bordered hover variant="dark" className={styles.equipment_price}>
        <tbody>
          <tr>
            <td>Your Jewels</td>
            <td><b>{this.props.jewels}</b>
              <img className="icon-sm" src={"/images/assets/jewel.png"} />
            </td>
          </tr>
          <tr>
            <td>Price</td>
            <td><b>{this.props.price}</b>
              <img className="icon-sm" src={"/images/assets/jewel.png"} />
            </td>
          </tr>
          <tr>
            <td>You Need</td>
            <td><b>{Math.abs(this.props.jewels - this.props.price)}</b>
              <img className="icon-sm" src={"/images/assets/jewel.png"} />
            </td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

export default FailDescription
