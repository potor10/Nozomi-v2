import { Component } from 'react'
import { Row, Nav, Table } from 'react-bootstrap'
import generateGachaList from './generate_gacha_list'

import createGachaPrompt from './create_gacha_prompt'
import NormalGacha from './normal_gacha/normal_gacha'
import PremiumGacha from './premium_gacha/premium_gacha'
import SpecialGacha from './special_gacha/special_gacha'
import JumpStartGacha from './jump_start_gacha/jump_start_gacha'

class GachaList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popup: undefined,
      displayed_gacha_id: this.props.current_gachas[Object.keys(this.props.current_gachas)[0]].gacha_id
    }
  }

  renderDisplayedGacha() {
    const initPrompt = (pull_amt, discount=false) => {
      console.log('hello')
      console.log('discount: '+discount)
      createGachaPrompt(this, this.state.displayed_gacha_id, pull_amt, discount)
    }

    if (this.props.current_gachas[this.state.displayed_gacha_id] === undefined) {
      return undefined
    }

    switch(this.props.current_gachas[this.state.displayed_gacha_id].type_id) {
      // Normal Gacha
      case 1:
        return (
          <NormalGacha {...this.props} gacha_id={this.state.displayed_gacha_id} create_prompt={initPrompt} />
        )
      case 2:
        return (
          <PremiumGacha {...this.props} gacha_id={this.state.displayed_gacha_id} create_prompt={initPrompt} />
        )
      case 6:
        return (
          <JumpStartGacha {...this.props} gacha_id={this.state.displayed_gacha_id} create_prompt={initPrompt} />
        )
      default:
        return (
          <SpecialGacha {...this.props} gacha_id={this.state.displayed_gacha_id} create_prompt={initPrompt} />
        )
    }
  }

  render() {
    return (
      <Row>
        {generateGachaList(this)}
        <Table striped bordered hover variant="dark" className="text-center">
        <tbody>
          <tr>
            <td>
              {this.props.user_stats.jewels}<img className="icon-sm" src="/images/assets/jewel.png" />
            </td>
            <td>
              {this.props.user_stats.amulets} <img className="icon-sm" src="/images/assets/amulet.png" />
            </td>
            <td>
              Char Exchange Pt: {this.props.user_stats.exchange_points}
            </td>
          </tr>
        </tbody>
      </Table>
        {this.renderDisplayedGacha()}
        {this.state.popup}
      </Row>
    )
  }
}

export default GachaList