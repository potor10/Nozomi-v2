
import React, { Component } from 'react'

class GachaFailTitle extends Component {
  render() {
    console.log(this.props)

    return (
      <>
        <h1>{this.props.current_gachas[this.props.gacha_id].gacha_name}</h1>
        <small>{this.props.current_gachas[this.props.gacha_id].description}</small>
      </>
    )
  }
} 

export default GachaFailTitle