
async rankUp() {
  this.setRankUp(false)
  
  const fetch_options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      server_id: this.props.server_data.id,
      unit_id: this.props.character.unit_id
    })
  }

  const res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/collection/equipment/rank_up`, fetch_options)
  if (res.status === 200) { 
    await this.props.reload_character()
    await this.props.reload_equipment()
    await this.props.reload_skills()
  }
}