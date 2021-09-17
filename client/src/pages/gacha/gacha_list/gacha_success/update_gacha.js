
import pullTen from './pull_ten'
import pull from './pull'

const updateGacha = async (component) => {
  console.log('pull amt' + component.props.pull_amt)
  let pull_data = {}

  if (component.props.pull_amt === 1) {
    pull_data = await pull(component, component.props.gacha_id, component.props.discount)
  } else {
    pull_data = await pullTen(component, component.props.gacha_id)
  }

  if (component.props.current_gachas[component.props.gacha_id].type_id === 1) {
    component.setState({ show_animation: false })
  }

  let user = component.props.user_stats
  user.jewels -= component.props.price

  if (pull_data.jewels_obtained) user.jewels += pull_data.jewels_obtained
  if (pull_data.amulets_obtained) user.amulets += pull_data.amulets_obtained
  if (pull_data.exchange_points_obtained) user.exchange_points += pull_data.exchange_points_obtained

  component.props.set_user(user)
}

export default updateGacha