import React, { Component } from 'react'
import Loading from './loading'
import logout from '../lib/logout'
import getAvatarUrl from '../lib/get_avatar_url'
import getGuildIconUrl from '../lib/get_server_icon_url'

const setServer = (server_data) => {
  localStorage.setItem('server_data', JSON.stringify(server_data))
  window.location.href = '/'
}

const ServerList = ({ discord_guilds }) => {
  console.log(discord_guilds)
  return (
    <>
      {discord_guilds.map(guild => {
        console.log(guild.icon)
        let icon_src = (guild.icon === null) ? ('/images/na.png') : getGuildIconUrl(guild)
        return (
          <button key={guild.id} onClick={() => setServer(guild)}>
            <img src={icon_src} />
            {guild.name}
          </button>
        )
      })}
    </>
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
  
    const res = await fetch(`http://localhost:8080/discord/guilds`, fetch_options)
    const discord_guilds = await res.json()
  
    console.log(discord_guilds)

    this.setState({ discord_guilds: discord_guilds })
    this.setState({ servers_loaded: true })
    console.log(this.state.servers_loaded)
  }

  componentDidMount() {
    this.getGuilds()
  }

  render() {
    return (
      <div>
        <div>
          <img src={getAvatarUrl(this.props.discord_user)}/>
          <p>Signed In As</p>
          <p>{this.props.discord_user.username}</p>
        </div>
        <h1>SERVER_LIST</h1>
        <div>
          {(this.state.servers_loaded) ? (<ServerList discord_guilds={this.state.discord_guilds}/>) : (<Loading />)}
        </div>
        <button onClick={logout}>Log Out</button>
      </div>
    )
  }
}

export default SelectServer