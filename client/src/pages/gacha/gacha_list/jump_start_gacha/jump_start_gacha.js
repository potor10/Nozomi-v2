import { Component } from 'react'
import { Col, Button } from 'react-bootstrap'


class JumpStartGacha extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Col md={6} className="text-center d-flex justify-content-center align-items-center">
        <div>
          <img src="/images/assets/gacha/jump_start_title.png" />
          <button 
            onClick={() => {return false}}>
            <img src="/images/assets/gacha/draw_10_premium.png" />
          </button>
        </div>
      </Col>
    )
  }
}

export default JumpStartGacha