import React from 'react'
import styles from './header.module.css'
import {Nav, Navbar, Container, NavDropdown, Dropdown} from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import getAvatarUrl from '../lib/get_avatar_url'
import getGuildIconUrl from '../lib/get_server_icon_url'
import logout from '../lib/logout'


const DiscordProfile = ({ discord_user }) => {
  return (
    <>
      <img className={styles.profile_pic} src={getAvatarUrl(discord_user)} />
      <span>{`${discord_user.username}`}</span>
    </>
  )
}

const changeServer = () => {
  localStorage.removeItem('server_data')
  window.location.href = '/'
}

const Header = ({ discord_user, server_data }) => {
  return (
    <header>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Nozomi Bot</Navbar.Brand>
          <Navbar.Toggle aria-controls="nozomi-navbar-nav" />
          <Navbar.Collapse id="nozomi-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/characters">Characters</Nav.Link>
              <Nav.Link href="/gacha">Gacha</Nav.Link>
              <Nav.Link href="/daily">Daily</Nav.Link>
              <Nav.Link href="/mailbox">Mailbox
                <span className={styles.notification}>1</span>
              </Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title={<DiscordProfile discord_user={discord_user}/>} id="collasible-nav-dropdown">
                <NavDropdown.Item href="/settings">
                  <img className={styles.profile_pic} src={getGuildIconUrl(server_data)} />
                  {server_data.name} Settings
                </NavDropdown.Item>
                <NavDropdown.Item onClick={changeServer}>Change Server</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header