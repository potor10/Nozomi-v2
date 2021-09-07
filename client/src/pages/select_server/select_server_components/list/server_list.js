// Import Modules
import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

// Import Style
import styles from './server_list.module.css'

// Import Functions
import getGuildIconUrl from '../../../../lib/url/get_server_icon_url'

// Renders the list of servers
class ServerList extends Component {
  /**
   * Render the component in react
   * @return {JSX} Render
   */
  render() {
    console.log(this.props.discord_guilds)
    return (
      (this.props.discord_guilds.length > 0) ? (
        <Container className={`${styles.server_select_menu} align-content-start`}>
          {this.props.discord_guilds.map(guild => {
            return (
              <button className={styles.server_select_button} key={guild.id} onClick={() => this.props.set_server(guild)}>
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
}

export default ServerList