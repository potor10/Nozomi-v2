import { Component } from 'react'
import { Table } from 'react-bootstrap'

class MoneyDisplay extends Component {
  render() {
    return (
      <Table striped bordered hover variant="dark" className="text-center">
        <tbody>
          <tr>
            <td>
              {this.props.user_stats.jewels}<img className="icon-sm" src="/images/assets/jewel.png" />
            </td>
            <td>
              {this.props.user_stats.mana} <img className="icon-sm" src="/images/assets/mana.png" />
            </td>
            <td>
              {this.props.user_stats.amulets} <img className="icon-sm" src="/images/assets/amulet.png" />
            </td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

export default MoneyDisplay