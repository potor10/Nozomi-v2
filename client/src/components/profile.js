import React from "react"
import getAvatarUrl from "../lib/get_avatar_url"
import getGuildIconUrl from "../lib/get_server_icon_url"

const Profile = ({ discord_user, server_data }) => {
  return (
    <>
      <h1>PROFILE</h1>
      <img src={getGuildIconUrl(server_data)} />
      <img src={getAvatarUrl(discord_user)} />
    </>
  )
}

export default Profile