import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Particles from 'react-particles-js'

import Loading from './loading'
import logout from '../lib/logout'
import getAvatarUrl from '../lib/get_avatar_url'
import getGuildIconUrl from '../lib/get_server_icon_url'

import styles from './select_server.module.css'

const setServer = (server_data) => {
  localStorage.setItem('server_data', JSON.stringify(server_data))
  window.location.href = '/'
}

const ServerList = ({ discord_guilds }) => {
  console.log(discord_guilds)
  return (
    (discord_guilds.length > 0) ? (
      <Container className={`${styles.server_select_menu} align-content-start`}>
        {discord_guilds.map(guild => {
          return (
            <button className={styles.server_select_button} key={guild.id} onClick={() => setServer(guild)}>
              <img className={styles.guild_icon} src={getGuildIconUrl(guild)} />
              <span className={styles.guild_name}>{guild.name}</span>
            </button>
          )
        })}
      </Container>) : (
      <small>No <b>Mutual Servers</b> With Nozomi</small>
    )
  )
}

class SelectServer extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      servers_loaded: false,
      discord_guilds: null
    }

    console.log(this.state.servers_loaded)
  }

  async getGuilds() {
    const fetch_options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }
  
    const res = await fetch(`${process.env.REACT_APP_WEB_URL}/discord/guilds`, fetch_options)
    if (res.status === 200) {
      const discord_guilds = await res.json()
    
      console.log(discord_guilds)

      this.setState({ discord_guilds: discord_guilds, servers_loaded: true })
      console.log(this.state.servers_loaded)
    } else {
      logout()
    }
  }

  componentDidMount() {
    this.getGuilds()
  }

  render() {
    return (
      <main className={styles.main}>
        <Container className={`${styles.select_server_wrapper} text-center d-flex justify-content-center align-items-center`}>
          <Row className="d-flex justify-content-center">
            <img className={styles.user_avatar} src={getAvatarUrl(this.props.discord_user)}/>
            <h1>{this.props.discord_user.username}</h1>
            {(this.state.servers_loaded) ? (<ServerList discord_guilds={this.state.discord_guilds}/>) : (<Loading />)}
            <button className={`${styles.logout_button} btn btn-danger`} onClick={logout}>Log Out</button>
          </Row>
        </Container>
        <Particles className={styles.particles}/>
      </main>
    )
  }
}

export default SelectServer