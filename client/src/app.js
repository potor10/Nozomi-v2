import React, { Component } from 'react'
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import QueryString from 'query-string'

import './styles/app.css'

import Header from './components/header'

import Login from './components/login'
import Loading from './components/loading'
import SelectServer from './components/select_server'

// Routed
import Profile from './components/profile'
import Character from './components/character'
import Characters from './components/characters'
import Daily from './components/daily'
import Gacha from './components/gacha'
import Mailbox from './components/mailbox'

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
          <Route path="/mailbox" component={Mailbox} />
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

      await fetch(`${process.env.REACT_APP_WEB_URL}/discord/login`, fetch_options)
        .then(async res => {
          if (res.status === 200) {
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

    const res = await fetch(`${process.env.REACT_APP_WEB_URL}/discord/user`, fetch_options)
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

  loginSwitch() {
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
        {this.loginSwitch()}
      </>
    )
  }
}

export default App
