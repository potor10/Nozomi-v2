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

    let equipment_enhance_data = {}
    // Format The Equipment Enhance For Indexing
    character_data.equipment_enhance_data.forEach(equipment_enhance => {
      equipment_enhance_data[equipment_enhance.equipment_id] = equipment_enhance
    })

    let skill_data = {}
    // Format The Skills For Indexing
    character_data.skill_data.forEach(skill => {
      skill_data[skill.skill_id] = skill
    })

    let skill_action_data = {}
    // Format The Actions For Indexing
    character_data.skill_action_data.forEach(action => {
      skill_action_data[action.action_id] = action
    })
    
    component.setState({ 
      character: character_data.unit,
      character_loaded: 1, 
      bond_cost_data: character_data.bond_cost_data,
      bond_data: character_data.bond_data,
      equipment_data: equipment_data,
      equipment_enhance_data: equipment_enhance_data,
      experience_unit_data: character_data.experience_unit_data,
      promotion_data: character_data.promotion_data,
      promotion_stats_data: character_data.promotion_stats_data,
      rarity_data: character_data.rarity_data,
      shop_static_price_grou_data: character_data.shop_static_price_grou_data,
      skill_action_data: skill_action_data,
      skill_cost_data: character_data.skill_cost_data,
      skill_data: skill_data,
      unit_skill_data: character_data.unit_skill_data })
  } else {
    console.log('FAIL')
    component.setState({ character_loaded: 0 })
  }
}

export default fetchCharacterData
