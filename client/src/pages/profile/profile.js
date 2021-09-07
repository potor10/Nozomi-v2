import React, { Component } from 'react'
import { Container, Row, Col, ProgressBar, Table } from 'react-bootstrap'


import StatsWindow from './profile_components/stats/stats_window'

import getAvatarUrl from '../../lib/url/get_avatar_url'
import getGuildIconUrl from '../../lib/url/get_server_icon_url'

import logout from '../../lib/user/logout'
import stats from '../../lib/user/stats'

import styles from './profile.module.css'

// Displays The User Profile
class Profile extends Component {
  /**
   * Render the component in react
   * @return {JSX} Render
   */
  render() {
    return (
      <Container className={`${styles.profile_wrapper} `}>
        <Row className={`d-flex justify-content-center`}>
          <Col md='2'>
            <Row className="d-flex justify-content-center align-items-center">
              <img className={styles.avatar_image} src={getAvatarUrl(this.props.discord_user)} />
            </Row>
          </Col>
          <Col md='4'>
            <h1 className="text-center">{this.props.discord_user.username}</h1>
            <StatsWindow user_stats={this.props.user_stats} server_data={this.props.server_data}/>
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