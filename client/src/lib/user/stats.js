// Import Functions
import logout from "./logout"

/**
 * Makes a fetch request to attempt to get user's stats as well as grabbing some xp info
 * @param {Class} component that we will be calling this code from 
 * @return {boolean} state of the request
 */
const stats = async (component) => {
  const fetch_options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  }

  const stats_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/user/stats/${component.props.server_data.id}`, fetch_options)
  if (stats_res.status === 200) {
    const user_stats = await stats_res.json()  
    console.log(user_stats)
    component.setState({ user_stats: user_stats, stats_loaded: 1 })
    return true
  } else {
    component.setState({ stats_loaded: 0 })
    return false
  }
}

export default stats