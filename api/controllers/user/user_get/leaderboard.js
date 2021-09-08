exports.get_all = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.params.server_id] !== undefined) {
      const account_db = new AccountDatabase(req.params.server_id, master_db)
      const guild_members = await fetch(`https://discord.com/api/guilds/${req.params.server_id}/members`, {
        headers: {
          authorization: `Bot ${process.env.BOT_TOKEN}`,
        },
      })

      const members = await guild_members.json()
      let member_ids = []
      for (const idx in members) {
        member_ids.push(members[idx].id)
      }

      const leaderboard = account_db.getAll(member_ids)
      res.status(200).json(leaderboard)
      account_db.close()
    } else {
      res.status(400).send('Please Select A Valid Server')
    }
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}