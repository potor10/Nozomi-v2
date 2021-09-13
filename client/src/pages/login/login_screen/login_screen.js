import { Component } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import styles from './login_screen.module.css'

// Generates The User Login Screen
class LoginScreen extends Component {
  /**
   * Render the component in react
   * @return {JSX} Render
   */
  render() {
    return(
      <Row 
        className="d-flex justify-content-center">
        <img 
          className={styles.app_avatar} 
          src="/images/nozomi_summer.png" />
        <h1>
          Nozomi Bot
        </h1>
        <small>
          You are running this application in <b>{process.env.NODE_ENV}</b> mode.
        </small>
        <a
          className={`${styles.login_button} btn btn-dark`} 
          href={process.env.REACT_APP_DISCORD_OAUTH}>
          Sign In With Discord
        </a>
        <Link
          className={`${styles.login_button} btn btn-dark`} 
          to="/news">
          News
        </Link>
      </Row>
    )
  }
}

export default LoginScreen