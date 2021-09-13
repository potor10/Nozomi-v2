import { Component } from 'react'
import { Col, Button } from 'react-bootstrap'

class NormalGacha extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Col md={6} className="text-center d-flex justify-content-center align-items-center">
        <div>
          <img src="/images/assets/gacha/normal_title.png" />
          <button 
            onClick={() => this.props.create_prompt(10)}>
          <img src="/images/assets/gacha/draw_normal.png" />
          </button>
        </div>
      </Col>
    )
  }
}

export default NormalGacha