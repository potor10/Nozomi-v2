import { Component } from 'react'
import { Col, Button } from 'react-bootstrap'

class NormalGacha extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Col md={12} className="text-center d-flex justify-content-center align-items-center">
        <div>
          <h1>{this.props.current_gachas[this.props.gacha_id].gacha_name}</h1>
          <div>
            <small>{this.props.current_gachas[this.props.gacha_id].description}</small>
            <small>{this.props.current_gachas[this.props.gacha_id].start_time}</small>
            <small>{this.props.current_gachas[this.props.gacha_id].end_time}</small>
          </div>
          <Button onClick={() => this.props.create_prompt(10)}>
            Draw x10 (FREE)
          </Button>
        </div>
      </Col>
    )
  }
}

export default NormalGacha