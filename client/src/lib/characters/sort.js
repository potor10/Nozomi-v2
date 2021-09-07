
const sortTotalPower = (a, b) => {
  if (a.total_power > b.total_power) return -1
  if (a.total_power < b.total_power) return 1
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}

const sortRarity = (a, b) => {
  if (a.rarity > b.rarity) return -1
  if (a.rarity < b.rarity) return 1
  if (a.total_power > b.total_power) return -1
  if (a.total_power < b.total_power) return 1
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}

const sortName = (a, b) => {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}

const sort = (characters, sort_idx) => {
  const sort_methods = [sortTotalPower, sortName, sortRarity]
  let new_characters = characters.sort(sort_methods[sort_idx])

  return new_characters
}

export default sort