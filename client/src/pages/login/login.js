import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import Particles from 'react-particles-js'

import styles from './login.module.css'

import LoginScreen from './login_components/screen/login_screen'
import News from './login_components/news/news'

// Generates The User Login Page
const Login = () => {
  /**
   * Render the component in react
   * @return {JSX} Render
   */
  return (
    <main>
      <Router>
        <Container className={`${styles.login_wrapper} text-center d-flex justify-content-center align-items-center`}>
          <Switch>
            <Route path="/news" component={News} />
            <Route path="/" component={LoginScreen} />
          </Switch>
        </Container>
      </Router>
      <Particles className="particles"/>
    </main>
  )
}

export default Login
