import { Component } from 'react'
import { Row, Nav } from 'react-bootstrap'
import generateExchangeList from './generate_exchange_list'


class ExchangeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popup: undefined
    }
  }

  render() {
    return (
      <Row>
        {generateExchangeList(this)}
        {this.state.popup}
      </Row>
    )
  }
}

export default ExchangeList