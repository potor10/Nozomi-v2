import React, { Component } from 'react'
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Particles from 'react-particles-js'

import QueryString from 'query-string'

import './styles/app.css'

import Header from './components/header/header'

import Login from './pages/login/login'
import Loading from './components/loading/loading'
import SelectServer from './pages/select_server/select_server'

// Routed
import Profile from './pages/profile/profile'
import Character from './pages/character/character'
import Characters from './pages/characters/characters'
import Daily from './pages/daily/daily'
import Gacha from './pages/gacha/gacha'
import Leaderboard from './pages/leaderboard/leaderboard'

import logout from './lib/logout'

const Home = ({ discord_user, server_data }) => {
  return (
    <Router>
      <Header discord_user={discord_user} server_data={server_data}/>
      <main>
        <Switch>
          <Route path="/characters"><Characters server_data={server_data} /></Route>
          <Route path="/character/:character_id"><Character server_data={server_data} /></Route>
          <Route path="/gacha"><Gacha server_data={server_data} /></Route>
          <Route path="/daily"><Daily server_data={server_data} /></Route>
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="/"><Profile discord_user={discord_user} server_data={server_data}/></Route>
        </Switch>
      </main>
      <footer />
    </Router>
  )
}

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

    console.log(this.state.login_status)
  }

  async loginUser(code) {
    console.log(this.state.login_status)
    if (this.state.login_status !== 1) {
      console.log('logging in?')
      const fetch_options = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({code: code})
      }

      await fetch(`${process.env.REACT_APP_WEB_URL}/api/discord/login`, fetch_options)
        .then(async res => {
          if (res.status === 200 && (await res.json()).success) {
            if (localStorage.getItem('discord_user') === null) {
              const discord_user = await this.getDiscordInfo()
              localStorage.setItem('discord_user', JSON.stringify(discord_user))
              this.setState({ discord_user: discord_user })
            }
            this.setState({ login_status: 1 })
          } else {
            // Remove possible existing data in storage
            localStorage.removeItem('discord_user')
            localStorage.removeItem('server_data')
            this.setState({ login_status: 0 })
          }
        })
    }
    console.log(this.state.discord_user)
  }

  async getDiscordInfo() {
    const fetch_options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }

    const res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/discord/user`, fetch_options)
    if (res.status === 200) {
      const discord_user = await res.json()
      return discord_user
    } else {
      logout()
    }
  }

  componentDidMount() {
    const query = QueryString.parse(window.location.search)
    if (query.code !== undefined) window.location.href = '/'
    this.loginUser(query.code)
  }

  loginRender() {
    switch (this.state.login_status) {
      case 1: 
        if (this.state.server_data === null) return (<SelectServer discord_user={this.state.discord_user}/>)
        else return (<Home discord_user={this.state.discord_user} server_data={this.state.server_data}/>)
      case 0: return (<Login />)
      case -1: return (<main style={{width: '100%', height: '100%'}}><Loading /></main>)
    }
  }

  render() {
    return (
      <>
        {this.loginRender()}
        <Particles className="particles"/>
      </>
    )
  }
}

export default App
