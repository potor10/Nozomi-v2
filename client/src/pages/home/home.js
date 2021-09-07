// Import Modules
import { Component } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

// Import Components
import Loading from '../../components/loading/loading'
import Header from '../../components/header/header'

// Import Pages
import Profile from '../profile/profile'
import Character from '../character/character'
import Characters from '../characters/characters'
import Daily from '../daily/daily'
import Gacha from '../gacha/gacha'
import Leaderboard from '../leaderboard/leaderboard'

// Import Functions
import stats from "../../lib/user/stats"

// Generates The Home Page
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      stats_loaded: -1,
      user_stats: null
    }
  }

  // Determines what to show on profile page based on state
  homeRender() {
    switch (this.state.stats_loaded) {
      case 1: return (
        <Switch>
          <Route path="/characters"><Characters server_data={this.props.server_data} /></Route>
          <Route path="/character/:character_id"><Character server_data={this.props.server_data} /></Route>
          <Route path="/gacha"><Gacha server_data={this.props.server_data} /></Route>
          <Route path="/daily"><Daily server_data={this.props.server_data} /></Route>
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="/">
            <Profile discord_user={this.props.discord_user} user_stats={this.state.user_stats} 
              server_data={this.props.server_data}/>
          </Route>
        </Switch>
      )
      case 0: return (<p>error loading user</p>)
      case -1: return (<Loading />)
    }
  }
  
  // Runs initializing code when the component is mounted
  componentDidMount() {
    stats(this)
  }

  /**
   * Render the component in react
   * @return {JSX} Render
   */
  render() {
    return (
      <Router>
        <Header discord_user={this.props.discord_user} server_data={this.props.server_data}/>
        <main>
          {this.homeRender()}
        </main>
        <footer />
      </Router>
    )
  }
}

export default Home