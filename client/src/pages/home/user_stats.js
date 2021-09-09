/**
 * Makes a fetch request to attempt to get user's stats as well as grabbing some xp info
 * @param {Class} component that we will be calling this code from 
 * @return {boolean} state of the request
 */
const userStats = async (component) => {
  const fetch_options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  }

  const stats_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/user/stats/${component.props.server_data.id}`, fetch_options)
  if (stats_res.status === 200) {
    const stats_info = await stats_res.json()  
    console.log(stats_info)
    component.setState({ 
      ...stats_info,
      stats_loaded: 1 
    })
    return true
  } else {
    component.setState({ stats_loaded: 0 })
    return false
  }
}

export default userStats