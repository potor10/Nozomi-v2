import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

import styles from './user_stat_table.module.css'

class UserStatTable extends Component {
    constructor(props) {
      super(props)
      this.state = {}
    }

  render() {
    return(
      <Table striped bordered hover variant="dark" className={`${styles.stat_table} text-center`}>
        <thead>
          <tr>
            <td colSpan="2">Account Stats</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img className="icon-sm" src="/images/assets/mana.png"/></td>
            <td>{this.props.user_stats.mana}</td>
          </tr>
          <tr>
            <td><img className="icon-sm" src="/images/assets/jewel.png"/></td>
            <td>{this.props.user_stats.jewels}</td>
          </tr>
          <tr>
            <td><img className="icon-sm" src="/images/assets/amulet.png"/></td>
            <td>{this.props.user_stats.amulets}</td>
          </tr>
          <tr>
            <td><img className="icon-sm" src="/images/assets/power.png"/></td>
            <td>{this.props.user_stats.total_power}</td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

export default UserStatTable