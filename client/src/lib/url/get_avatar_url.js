const getAvatarUrl = (discord_user) => {
  const avatar_src = (discord_user.avatar === null) ? ('/images/na.png') : 
    'https://cdn.discordapp.com/avatars/' + discord_user.id + '/' + discord_user.avatar + '?size=128'

  return avatar_src
}

export default getAvatarUrl