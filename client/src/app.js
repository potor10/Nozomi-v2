// Import Modules
import React, { Component } from 'react'
import Particles from 'react-particles-js'
import QueryString from 'query-string'

// Import Styles
import './styles/app.css'

// Import Components
import Loading from './components/loading/loading'

// Import Pages
import Login from './pages/login/login'
import SelectServer from './pages/select_server/select_server'
import Home from './pages/home/home'

// Import Functions
import loginUser from './lib/user/login_user'

// Standard app wrapper for the webapp
class App extends Component {
  constructor(props) {
    super(props)
    let discord_user = localStorage.getItem('discord_user')
    let server_data = localStorage.getItem('server_data')
    this.state = { 
      login_status: -1,
      discord_user: (discord_user === null) ? null : JSON.parse(discord_user),
      server_data: (server_data === null) ? null : JSON.parse(server_data)
    }

    this.setServer = this.setServer.bind(this)
  }

  /**
   * Sets the currently selected server into the user's local storage
   * @param server_data the data of the server we're selecting
   */
  setServer(server_data) {
    localStorage.setItem('server_data', JSON.stringify(server_data))
    this.setState({ server_data: server_data })
  }

  // Determines what to show the user based on the state of currently loaded info
  loginRender() {
    switch (this.state.login_status) {
      case 1: 
        if (this.state.server_data === null) {
          return (<SelectServer {...this.state} set_server={this.setServer} />)
        } else {
          return (<Home {...this.state} />)
        }
      case 0: 
        return (<Login />)
      case -1: 
        return (
          <main>
            <Loading />
          </main>
        )
    }
  }

  // Runs initializing code when the component is mounted
  componentDidMount() {
    const query = QueryString.parse(window.location.search)
    if (query.code !== undefined) window.location.href = '/'
    loginUser(this, query.code)
  }

  /**
   * Render the component in react
   * @return {JSX} Render
   */
  render() {
    return (
      <>
        {this.loginRender()}
        <Particles className="particles" />
      </>
    )
  }
}

export default App
