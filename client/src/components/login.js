import React, { useEffect } from 'react'
import styles from './login.module.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Particles from 'react-particles-js'

const LoginMain = () => {
  return(
    <>
      <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
      <p>{process.env.REACT_APP_DISCORD_OAUTH}</p>
      <a href={process.env.REACT_APP_DISCORD_OAUTH}>Sign In With Discord</a>
      <a href="/help">HELP!</a>
    </>
  )
}

const LoginHelp = () => {
  return(
    <>
      <p>wtf who said u needed help</p>
      <a href="/">Back!!!</a>
    </>
  )
}

const Login = () => {
  return (
    <main>
      <Router>
        <Switch>
          <Route path="/help" component={LoginHelp} />
          <Route path="/" component={LoginMain} />
        </Switch>
      </Router>
      <Particles className={styles.particles}/>
    </main>
  )
}

export default Login
