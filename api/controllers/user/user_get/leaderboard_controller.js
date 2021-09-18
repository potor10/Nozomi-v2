// Import Modules
import fetch from 'node-fetch'

// Import Classes
import UserDatabase from '../../../../lib/databases/user_database.js'

const leaderboardController = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.params.server_id] !== undefined) {
      const user_db = new UserDatabase(req.params.server_id)
      const guild_members = await fetch(`https://discord.com/api/guilds/${req.params.server_id}/members?limit=1000`, {
        headers: {
          authorization: `Bot ${process.env.BOT_TOKEN}`,
        },
      })

      const members = await guild_members.json()
      let leaderboard = []
      members.forEach(member => {
        const member_info = {
          user_id: member.user.id,
          user_name: member.user.username,
          avatar: member.user.avatar,
          user_stats: user_db.getUser(member.user.id)
        }

        if (!member.user.bot) {
          leaderboard.push(member_info)
        }
      })

      console.log(members)
      
      res.status(200).json(leaderboard)
      user_db.close()
    } else {
      res.status(400).send('Please Select A Valid Server')
    }
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}

export default leaderboardController