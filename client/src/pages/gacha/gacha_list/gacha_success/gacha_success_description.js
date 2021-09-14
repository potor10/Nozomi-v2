
import { Button } from 'react-bootstrap'
import React, { Component } from 'react'

import Loading from '../../../../components/loading/loading'

import pullTen from './pull_ten'
import pull from './pull'

import GachaDisplay from './gacha_display'

import styles from './gacha_success_description.module.css'

class GachaSuccessDescription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gif_lucky: '/images/assets/gacha/pull_lucky.gif',
      gif_unlucky: '/images/assets/gacha/pull_unlucky.gif',
      loaded_gif: '',

      show_animation: true,
      pull_result: {},
      pull_loaded: -1
    }

    this.skipAnimation = this.skipAnimation.bind(this)
  }

  renderAnimation() {
    switch (this.state.pull_loaded) {
      case 1:
        if (this.state.show_animation) {
          return (
            <div>
              <img className={styles.pull_gif} 
                src={this.state.loaded_gif.replace(/\?.*$/,"")+"?x="+Math.random()} />
              <Button onClick={this.skipAnimation}> Skip </Button>
            </div>
          )
        } else {
          return (
            <>
              <GachaDisplay {...this.state} {...this.props} />
              <Button onClick={this.props.remove_prompt}>Close</Button>
            </>
          )
        }
      case -1:
        return (<Loading />)
      case 0:
        return (
          <>
            <p>failed</p>
            <Button onClick={this.props.remove_prompt}>Close</Button>
          </>
        )
    }
  }

  skipAnimation() {
    this.setState({ show_animation: false })
  }

  componentDidMount() {
    console.log('pull amt' + this.props.pull_amt)
    if (this.props.pull_amt === 1) {
      pull(this, this.props.gacha_id, this.props.discount)
    } else {
      pullTen(this, this.props.gacha_id)
    }

    if (this.props.current_gachas[this.props.gacha_id].type_id === 1) {
      this.setState({ show_animation: false })
    }

    console.log("MOUNTED SUCCESS!")

    
  }

  render() {
    console.log(this.props)

    return (
      <>
        {this.renderAnimation()}
      </>
    )
  }
} 

export default GachaSuccessDescription