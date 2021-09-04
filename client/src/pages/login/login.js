import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import Particles from 'react-particles-js'

import styles from './login.module.css'

const LoginMain = () => {
  return(
    <Row className="d-flex justify-content-center">
      <img className={styles.app_avatar} src="/images/nozomi_summer.png" />
      <h1>Nozomi Bot</h1>
      <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
      <a className={`${styles.login_button} btn btn-dark`} href={process.env.REACT_APP_DISCORD_OAUTH}>Sign In With Discord</a>
      <a className={`${styles.login_button} btn btn-dark`} href="/about">About</a>
    </Row>
  )
}

const About = () => {
  return(
    <Row className="d-flex justify-content-center">
      <p>wtf who said u needed help</p>
      <a className={`${styles.login_button} btn btn-dark`} href="/">Back</a>
    </Row>
  )
}

const Login = () => {
  return (
    <main>
      <Router>
        <Container className={`${styles.login_wrapper} text-center d-flex justify-content-center align-items-center`}>
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/" component={LoginMain} />
          </Switch>
        </Container>
      </Router>
      <Particles className="particles"/>
    </main>
  )
}

export default Login
