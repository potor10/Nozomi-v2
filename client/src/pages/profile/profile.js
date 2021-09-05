import React, { Component } from 'react'
import { Container, Row, Col, ProgressBar, Table } from 'react-bootstrap'
import Loading from '../../components/loading/loading'
import UserStatTable from '../../components/user_stat_table/user_stat_table'

import getAvatarUrl from '../../lib/get_avatar_url'
import getGuildIconUrl from '../../lib/get_server_icon_url'

import logout from '../../lib/logout'

import styles from './profile.module.css'

const StatsWindow = ({ user_stats }) => {
  const exp = user_stats.exp - user_stats.exp_current_level 
  const needed_exp = user_stats.exp_next_level - user_stats.exp_current_level 

  return (
    <div className={styles.stat_wrapper}>
      <Row className="text-center">
        <span>Level {user_stats.level}</span>
      </Row>
      <ProgressBar animated variant="warning" now={exp/needed_exp * 100} label={`${exp}/${needed_exp}`} />
      <Row className="text-center">
        <small>Talk In Discord Servers To Increase Your Player Level!</small>
      </Row>
      <Row className="text-center">
        <UserStatTable user_stats={user_stats} />
      </Row>
    </div>
  )
}

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      stats_loaded: false,
      user_stats: null
    }

    console.log(this.state.stats_loaded)
  }

  async getStats() {
    const fetch_options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }
  
    console.log(this.props.server_data.id)
    const user_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/account/me/${this.props.server_data.id}`, fetch_options)
    if (user_res.status === 200) {
      const user_stats = await user_res.json()    
      console.log(user_stats)
      const exp_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/masterdb/exp/${user_stats.level}`, fetch_options)
      if (exp_res.status === 200) {
        const exp_data = await exp_res.json()

        user_stats.exp_current_level = exp_data.exp_current_level
        user_stats.exp_next_level = exp_data.exp_next_level
        console.log(exp_data.exp_next_level)

        this.setState({ user_stats: user_stats, stats_loaded: true })
        console.log(this.state.servers_loaded)
        console.log(this.props.server_data)
      } else {
        logout()
      }
    } else {
      logout()
    }
  }

  componentDidMount() {
    this.getStats()
  }

  render() {
    return (
      <Container className={`${styles.profile_wrapper} `}>
        <Row className={`d-flex justify-content-center`}>
          <Col sm='2'>
            <Row className="d-flex justify-content-center align-items-center">
              <img className={styles.avatar_image} src={getAvatarUrl(this.props.discord_user)} />
            </Row>
          </Col>
          <Col sm='4'>
            <h1 className="text-center">{this.props.discord_user.username}</h1>
            {(this.state.stats_loaded) ? (<StatsWindow user_stats={this.state.user_stats}/>) : (<Loading />)}
          </Col>
        </Row>
        <Row className={`d-flex text-center justify-content-center`}>
          <h1>Featured Here</h1>
        </Row>
      </Container>
    )
  }
}

export default Profile