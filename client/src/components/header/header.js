import React, { Component } from 'react'
import styles from './header.module.css'
import { Nav, Navbar, Container, NavDropdown, Dropdown} from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import getAvatarUrl from '../../lib/url/get_avatar_url'
import getGuildIconUrl from '../../lib/url/get_server_icon_url'
import logout from '../../lib/logout'


class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    
    this.changeServer = this.changeServer.bind(this)
  }

  renderDiscordProfile() {
    return (
      <>
        <img className={styles.profile_pic} src={getAvatarUrl(this.props.discord_user)} />
        <span>{`${this.props.discord_user.username}`}</span>
      </>
    )
  }

  changeServer() {
    this.props.set_server(null)
  }

  render() {
    return (
      <header>
        <Navbar collapseOnSelect expand="lg" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img className={styles.app_avatar} src="/images/nozomi.png" />
              Nozomi Bot
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="nozomi-navbar-nav" />
            <Navbar.Collapse id="nozomi-navbar-nav">
              <Nav activeKey="/" className="me-auto">
                <Nav.Link eventKey="1" as={Link} to="/characters">
                  Characters
                </Nav.Link>
                <Nav.Link eventKey="2" as={Link} to="/gacha">
                  Gacha
                </Nav.Link>
                <Nav.Link eventKey="3" as={Link} to="/daily">
                  Daily
                </Nav.Link>
                <Nav.Link eventKey="4" as={Link} to="/badges">
                  Badges
                </Nav.Link>
                <Nav.Link eventKey="5" as={Link} to="/exchange">
                  Exchange
                </Nav.Link>
                <Nav.Link eventKey="6" as={Link} to="/leaderboard">
                  Leaderboard
                </Nav.Link>
                <Nav.Link eventKey="7" as={Link} to="/support">
                  Support
                </Nav.Link>
              </Nav>
              <Nav>
                <NavDropdown title={this.renderDiscordProfile()} id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/settings">
                    <img className={styles.profile_pic} src={getGuildIconUrl(this.props.server_data)} />
                    Server Settings
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={this.changeServer}>
                    Change Server
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={this.props.logout_user}>Log Out</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    )
  }
}

export default Header