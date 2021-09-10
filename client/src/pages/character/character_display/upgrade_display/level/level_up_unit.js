

const levelUpUnit = async (component, max) => {
  const fetch_options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      server_id: component.props.server_data.id,
      unit_id: component.props.unit.unit_id,
      max: max 
    })
  }

  const res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/character/level`, fetch_options)

  if (res.status === 200) {
    return true
  } else {
    return false
  }
}

export default levelUpUnit