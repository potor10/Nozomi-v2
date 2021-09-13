
import React, { Component } from 'react'

class GachaSuccessTitle extends Component {

  componentDidMount() {
    console.log("MOUNTED SUCCESS TITLE!")
  }

  render() {
    console.log(this.props)

    return (
      <>
        <h1>hello</h1>
        <small>roll gacha?</small>
        <p>pullTen(this.props.server_data.id, this.props.gacha_id)</p>
      </>
    )
  }
} 

export default GachaSuccessTitle