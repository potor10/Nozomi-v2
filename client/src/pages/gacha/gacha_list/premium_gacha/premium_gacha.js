import { Component } from 'react'
import { Col, Button } from 'react-bootstrap'

class PremiumGacha extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let disabled = !this.props.current_gachas[this.props.gacha_id].pull_available
    let discount_disabled = !this.props.current_gachas[this.props.gacha_id].discount_available

    let formatted_start = new Date(this.props.current_gachas[this.props.gacha_id].start_time + ' UTC')
    let formatted_end = new Date(this.props.current_gachas[this.props.gacha_id].end_time + ' UTC')

    return (
      <Col md={12} className="text-center d-flex justify-content-center align-items-center">
        <div>
          <h1>{this.props.current_gachas[this.props.gacha_id].gacha_name}</h1>
          <div>
            <small>{this.props.current_gachas[this.props.gacha_id].description}</small>
            <p>{formatted_start.toLocaleString('en-US')}</p>
            <p>{formatted_end.toLocaleString('en-US')}</p>
          </div>
          <Button variant={(disabled || discount_disabled) ? "secondary" : "warning"}
            disabled={disabled || discount_disabled}
            onClick={() => this.props.create_prompt(1, true)}>
            <div>
              Daily Deal!
            </div>
            <div className="d-flex justify-content-center align-items-center">
              {this.props.current_gachas[this.props.gacha_id].discount_price}
              <img className="icon-sm" src="/images/assets/jewel.png" />
            </div>
          </Button>
          <Button variant={(disabled) ? "secondary" : "info"}
            disabled={disabled}
            onClick={() => this.props.create_prompt(1)}>
            Draw 1
            <div className="d-flex justify-content-center align-items-center">
              {this.props.current_gachas[this.props.gacha_id].price}
              <img className="icon-sm" src="/images/assets/jewel.png" />
            </div>
          </Button>
          <Button variant={(disabled) ? "secondary" : "info"}
            disabled={disabled}
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

export default PremiumGacha