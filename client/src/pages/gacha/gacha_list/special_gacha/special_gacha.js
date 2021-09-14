import { Component } from 'react'
import { Col, Button } from 'react-bootstrap'

class SpecialGacha extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Col md={12} className="text-center d-flex justify-content-center align-items-center">
        <div>
          <img src={`/images/banner/banner_${this.props.current_banner.banner_id}.png`} />
          <h1>{this.props.current_gachas[this.props.gacha_id].gacha_name}</h1>
          <div>
            <small>{this.props.current_gachas[this.props.gacha_id].description}</small>
            <small>{this.props.current_gachas[this.props.gacha_id].start_time}</small>
            <small>{this.props.current_gachas[this.props.gacha_id].end_time}</small>
          </div>
          <Button variant="warning"
            onClick={() => this.props.create_prompt(1, true)}>
            <div>
              Daily Deal!
            </div>
            <div className="d-flex justify-content-center align-items-center">
              {this.props.current_gachas[this.props.gacha_id].discount_price}
              <img className="icon-sm" src="/images/assets/jewel.png" />
            </div>
          </Button>
          <Button variant="info"
            onClick={() => this.props.create_prompt(1)}>
            Draw 1
            <div className="d-flex justify-content-center align-items-center">
              {this.props.current_gachas[this.props.gacha_id].price}
              <img className="icon-sm" src="/images/assets/jewel.png" />
            </div>
          </Button>
          <Button variant="info"
            onClick={() => this.props.create_prompt(10)}>
            Draw 10
            <div className="d-flex justify-content-center align-items-center">
              {this.props.current_gachas[this.props.gacha_id].price * 10}
              <img className="icon-sm" src="/images/assets/jewel.png" />
            </div>
          </Button>
        </div>
      </Col>
    )
  }
}

export default SpecialGacha