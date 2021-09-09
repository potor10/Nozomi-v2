
const searchCharacters = (characters, search_term) => {
  let new_characters = characters.filter(character => {
    return character.name.toLowerCase().includes(search_term.toLowerCase())
  })

  return new_characters
}

export default searchCharacters