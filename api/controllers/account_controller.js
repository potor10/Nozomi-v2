// Dependencies
const MasterDatabase = require('../../lib/master_database')
const master_db = new MasterDatabase()

const AccountDatabase = require('../../lib/account_database')

exports.get_me = async (req, res) => {
  if (req.session.login_status === true) {
    console.log(req.params.server_id)
    if (req.session.mutual_guilds[req.params.server_id] !== undefined) {
      const account_db = new AccountDatabase(req.params.server_id, master_db)
      const user = account_db.getUser(req.session.user_data.id)
      res.status(200).json(user)
    } else {
      res.status(400).send('Please Select A Valid Server')
    }
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}

exports.get_user = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.params.server_id] !== undefined) {
      const account_db = new AccountDatabase(req.params.server_id, master_db)
      const user = account_db.getUser(req.params.discord_id)
      res.status(200).json(user)
    } else {
      res.status(400).send('Please Select A Valid Server')
    }
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}

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
    } else {
      res.status(400).send('Please Select A Valid Server')
    }
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}


exports.daily = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.params.server_id] !== undefined) {
      const account_db = new AccountDatabase(req.params.server_id, master_db)
      console.log(req.session.user_data.id)
      if (account_db.daily(req.session.user_data.id)) {
        res.status(200).send('Successful Daily Claim')
      } else {
        res.status(204).send('Already Claimed')
      }
    } else {
      res.status(400).send('Please Select A Valid Server')
    }
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}