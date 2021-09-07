// Import Modules
import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Particles from 'react-particles-js'

// Import Styles
import styles from './select_server.module.css'

// Import Components
import ServerList from './select_server_components/list/server_list'
import Loading from '../../components/loading/loading'

// Import Functions
import discordGuilds from '../../lib/discord/discord_guilds'
import getAvatarUrl from '../../lib/url/get_avatar_url'
import logout from '../../lib/user/logout'

class SelectServer extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      servers_loaded: -1,
      discord_guilds: null
    }
  }

  // Runs initializing code when the component is mounted
  componentDidMount() {
    console.log('hello3')
    discordGuilds(this)
  }

  /**
   * Render the component in react
   * @return {JSX} Render
   */
  render() {
    return (
      <main className={styles.main}>
        <Container className={`${styles.select_server_wrapper} text-center d-flex justify-content-center align-items-center`}>
          <Row className="d-flex justify-content-center">
            <img className={styles.user_avatar} src={getAvatarUrl(this.props.discord_user)}/>
            <h1>{this.props.discord_user.username}</h1>
            {(this.state.servers_loaded === 1) ? (
              <ServerList discord_guilds={this.state.discord_guilds} set_server={this.props.set_server}/>
              ) : (
              <Loading />
            )}
            <button className={`${styles.logout_button} btn btn-danger`} onClick={logout}>Log Out</button>
          </Row>
        </Container>
        <Particles className="particles"/>
      </main>
    )
  }
}

export default SelectServer