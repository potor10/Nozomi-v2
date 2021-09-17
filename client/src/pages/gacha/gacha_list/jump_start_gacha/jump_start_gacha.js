import { Component } from 'react'
import { Col, Button } from 'react-bootstrap'


class JumpStartGacha extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let disabled = !this.props.current_gachas[this.props.gacha_id].pull_available
    return (
      <Col md={12} className="text-center d-flex justify-content-center align-items-center">
        <div>
          <h1>{this.props.current_gachas[this.props.gacha_id].gacha_name}</h1>
          <div>
            <small>{this.props.current_gachas[this.props.gacha_id].description}</small>
            <small> One Time Only!</small>
          </div>
          <Button variant={(disabled) ? "secondary" : "warning"} disabled={disabled}
            onClick={() => this.props.create_prompt(10)}>
            <div className="d-flex justify-content-center align-items-center">
              Draw 10! {this.props.current_gachas[this.props.gacha_id].price}
              <img className="icon-sm" src="/images/assets/jewel.png" />
            </div>
          </Button>
        </div>
      </Col>
    )
  }
}

export default JumpStartGacha