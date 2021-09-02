const getGuildIconUrl = (guild) => {
  const icon_src = (guild.icon === null) ? ('/images/na.png') : 
    'https://cdn.discordapp.com/icons/' + guild.id + '/' + guild.icon + '?size=128'

  return icon_src
}

export default getGuildIconUrl
