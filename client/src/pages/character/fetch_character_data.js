const fetchCharacterData = async (component, server_id, unit_id) => {
  const fetch_options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  }

  const character_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/character/get/${server_id}/${unit_id}`, fetch_options)
  if (character_res.status === 200) {
    const character_data = await character_res.json()
    console.log(character_data)

    let equipment_data = {}
    // Format The Equipment For Indexing
    character_data.equipment_data.forEach(equipment => {
      equipment_data[equipment.equipment_id] = equipment
    })

    character_data.equipment_data = equipment_data

    let equipment_enhance_data = {}
    // Format The Equipment Enhance For Indexing
    character_data.equipment_enhance_data.forEach(equipment_enhance => {
      equipment_enhance_data[equipment_enhance.equipment_id] = equipment_enhance
    })

    character_data.equipment_enhance_data = equipment_enhance_data

    let skill_data = {}
    // Format The Skills For Indexing
    character_data.skill_data.forEach(skill => {
      skill_data[skill.skill_id] = skill
    })

    character_data.skill_data = skill_data

    let skill_action_data = {}
    // Format The Actions For Indexing
    character_data.skill_action_data.forEach(action => {
      skill_action_data[action.action_id] = action
    })

    character_data.skill_action_data = skill_action_data
    
    console.log(character_data.unit)

    component.setState({ 
      ...character_data,
      unit_loaded: 1
    })
  } else {
    console.log('FAIL')
    component.setState({ character_loaded: 0 })
  }
}

export default fetchCharacterData
