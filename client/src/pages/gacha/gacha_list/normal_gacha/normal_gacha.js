import { Component } from 'react'
import { Col, Button } from 'react-bootstrap'

class NormalGacha extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let disabled = !this.props.current_gachas[this.props.gacha_id].pull_available
    let reset_1 = (new Date("2011-04-20 13:00 UTC")).toLocaleTimeString('en-US')
    let reset_2 = (new Date("2011-04-20 20:00 UTC")).toLocaleTimeString('en-US')

    return (
      <Col md={12} className="text-center d-flex justify-content-center align-items-center">
        <div>
          <h1>{this.props.current_gachas[this.props.gacha_id].gacha_name}</h1>
          <div>
            <small>{this.props.current_gachas[this.props.gacha_id].description}</small>
            <small> Available twice per day at {reset_1} and {reset_2}</small>
          </div>
          <Button variant={(disabled) ? "secondary" : "info"}
            disabled={disabled}
            onClick={() => this.props.create_prompt(10)}>
            Draw x10 (FREE)
          </Button>
        </div>
      </Col>
    )
  }
}

export default NormalGacha