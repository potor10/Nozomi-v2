
import React, { Component } from 'react'

class GachaSuccessTitle extends Component {

  componentDidMount() {
    console.log("MOUNTED SUCCESS TITLE!")
  }

  render() {
    console.log(this.props)

    return (
      <>
        <h1>{this.props.discord_user.username}'s Roll On {this.props.current_gachas[this.props.gacha_id].gacha_name}</h1>
        <small>{this.props.current_gachas[this.props.gacha_id].description}</small>
      </>
    )
  }
} 

export default GachaSuccessTitle