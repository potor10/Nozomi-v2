const fetchCharacters = async (component, server_id) => {
  const fetch_options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  }

  const characters_res = await fetch(`${process.env.REACT_APP_WEB_URL}/api/characters/${server_id}`, fetch_options)
  if (characters_res.status === 200) {
    console.log('hello22')
    let collection = await characters_res.json()
  
    let rarity_data = {}
    // Format The Rarity For Indexing 
    collection.rarity_data.forEach(char_rarity => {
      if (rarity_data[char_rarity.unit_id] === undefined) rarity_data[char_rarity.unit_id] = []
      rarity_data[char_rarity.unit_id].push(char_rarity)
    })

    collection.rarity_data = rarity_data

    let promotion_data = {}
    // Format The Promotion For Indexing 
    collection.promotion_data.forEach(char_promotion => {
      if (promotion_data[char_promotion.unit_id] === undefined) promotion_data[char_promotion.unit_id] = []
      promotion_data[char_promotion.unit_id].push(char_promotion)
    })

    collection.promotion_data = promotion_data

    console.log(promotion_data)
    console.log(collection.units)

    component.setState({ 
      ...collection,
      units_loaded: 1,
      displayed_units: collection.units,

      sort_id: 0,
      search_term: '',
      page_max: 12,
      total_pages: Math.ceil(collection.units.length / 12)
    })
  } else {
    console.log('goodbye')
    component.setState({ characters_loaded: 0 })
  }
}

export default fetchCharacters