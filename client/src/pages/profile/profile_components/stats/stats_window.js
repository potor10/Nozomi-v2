import { Component } from "react"

import styles from './stats_window.module.css'

import { Container, Row, Col, ProgressBar, Table } from 'react-bootstrap'
import UserStatTable from '../../../../components/user_stat_table/user_stat_table'

// Generate The User Stats Display
class StatsWindow extends Component {
  /**
   * Render the component in react
   * @return {JSX} Render
   */
  render() {
    const current_level_exp = this.props.user_stats.user.exp - 
      this.props.user_stats.experience_team[this.props.user_stats.user.level-1].total_exp
    const needed_exp = this.props.user_stats.experience_team[this.props.user_stats.user.level].total_exp - 
      this.props.user_stats.experience_team[this.props.user_stats.user.level-1].total_exp

    return (
      <div className={styles.stat_wrapper}>
        <Row className="text-center">
          <span>Level {this.props.user_stats.level}</span>
        </Row>
        <ProgressBar animated variant="warning" now={current_level_exp/needed_exp * 100} 
          label={`${current_level_exp}/${needed_exp}`} />
        <Row className="text-center">
          <small>Talk in {this.props.server_data.name} for exp!</small>
        </Row>
        <Row className="text-center">
          <UserStatTable user={this.props.user_stats.user} />
        </Row>
      </div>
    )
  }
}

export default StatsWindow