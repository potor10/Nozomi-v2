import { Component } from 'react'
import { Col, Button } from 'react-bootstrap'

class PremiumGacha extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Col md={6} className="text-center d-flex justify-content-center align-items-center">
        <div>
          <img src="/images/assets/gacha/premium_title.png" />
          <Button 
            onClick={() => this.props.create_prompt(10)}>
            <img src="/images/assets/gacha/draw_10_premium.png" />
          </Button>
          <Button 
            onClick={() => this.props.create_prompt(1)}>
            <img src="/images/assets/gacha/draw_premium.png" />
          </Button>
          <Button 
            onClick={() => this.props.create_prompt(1, true)}>
            <img src="/images/assets/gacha/draw_premium_daily.png" />
          </Button>
        </div>
      </Col>
    )
  }
}

export default PremiumGacha