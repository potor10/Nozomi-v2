import { Component } from 'react'
import { Col, Button } from 'react-bootstrap'

class SpecialGacha extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Col md={6} className="text-center d-flex justify-content-center align-items-center">
        <div>
          <img src={`/images/banner/banner_${this.props.current_banner.banner_id}.png`} />
          <Button 
            onClick={() => {return false}}>
            <img src="/images/assets/gacha/draw_10_premium.png" />
          </Button>
          <Button 
            onClick={() => {return false}}>
            <img src="/images/assets/gacha/draw_premium.png" />
          </Button>
        </div>
      </Col>
    )
  }
}

export default SpecialGacha