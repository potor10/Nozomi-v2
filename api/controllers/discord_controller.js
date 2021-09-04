// Dependencies
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

exports.login = async (req, res) => {
  if (req.session.login_status !== true) {
    code = req.body.code
    if (code) {
      try {
        const oauth_result = await fetch('https://discord.com/api/oauth2/token', {
          method: 'POST',
          body: new URLSearchParams({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: process.env.WEBSITE_URL,
            scope: 'identify',
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })

        const oauth_data = await oauth_result.json()
        if (oauth_data.access_token !== undefined) {
          req.session.oauth = oauth_data
          req.session.login_status = true
          req.session.cookie.expires = new Date(Date.now() + (oauth_data.expires_in * 1000))
          res.status(200).send({ success: true })
        } else { 
          res.status(401).send('You Must Provide A Valid Code')
        }
      } catch (error) {
        console.error(error)
        res.status(500).send('Server Error While Logging In')
      }
    } else {
      res.status(200).send({ success: false })
    }
  } else {
    res.status(200).send({ success: true })
  }
}

exports.logout = (req, res) => {
  req.session.destroy()
  res.status(200).send('Successfully Logged Out')
}

exports.user = async (req, res) => {
  if (req.session.login_status === true) {
    const user_result = await fetch('https://discord.com/api/users/@me', {
      headers: {
        authorization: `${req.session.oauth.token_type} ${req.session.oauth.access_token}`,
      },
    })

    const user_data = await user_result.json()
    req.session.user_data = user_data
    res.status(200).json(user_data)
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}

exports.guilds = async (req, res) => {
  if (req.session.login_status === true) {
    const user_guilds_json = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        authorization: `${req.session.oauth.token_type} ${req.session.oauth.access_token}`,
      },
    })

    const user_guilds = await user_guilds_json.json()
    let user_guilds_ids = {}
    for (const idx in user_guilds) {
      user_guilds_ids[user_guilds[idx].id] = user_guilds[idx]
    }

    const bot_guilds_json = await fetch(`https://discord.com/api/users/@me/guilds`, {
      headers: {
        authorization: `Bot ${process.env.BOT_TOKEN}`,
      },
    })

    req.session.mutual_guilds = {}
    let mutual_guilds = []
    const bot_guilds = await bot_guilds_json.json()
    for (const idx in bot_guilds) {
      const current_guild = user_guilds_ids[bot_guilds[idx].id]
      if (current_guild !== undefined) {
        req.session.mutual_guilds[current_guild.id] = current_guild
        mutual_guilds.push(current_guild)
      }
    }

    res.status(200).json(mutual_guilds)
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}