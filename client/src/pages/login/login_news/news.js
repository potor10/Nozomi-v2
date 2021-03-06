
import { Component } from 'react'
import styles from './news.module.css'
import { Container, Row } from 'react-bootstrap'
import { Link  } from 'react-router-dom'

// Generates The News Page
class News extends Component {
  /**
   * Render the component in react
   * @return {JSX} Render
   */
  render() {
    return(
      <Row 
        className="d-flex justify-content-center">
        <p>
          Hey, Potor here.
        </p>
        <p>
          You might know me as the one who likes your guildhouse in Princess Connect Re:Dive
        </p>
        <p>
          Nozomi Bot was created and designed to be a fully featured gacha bot
        </p>
        <Link
          className={`${styles.login_button} btn btn-dark`} 
          to="/">
          Back
        </Link>
      </Row>
    )
  }
}

export default News