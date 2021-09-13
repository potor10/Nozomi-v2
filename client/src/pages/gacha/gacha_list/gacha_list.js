import { Component } from 'react'
import { Row } from 'react-bootstrap'
import generateGachaList from './generate_gacha_list'

class GachaList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popup: undefined
    }
  }

  render() {
    return (
      <Row>
        {generateGachaList(this)}
        {this.state.popup}
      </Row>
    )
  }
}

export default GachaList