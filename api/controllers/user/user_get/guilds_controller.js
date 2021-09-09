// Import Modules
import fetch from 'node-fetch'

// Import Classes
import UserDatabase from '../../../../lib/databases/user_database.js'
import CollectionDatabase from '../../../../lib/databases/collection_database.js'

/**
 * Obtains the current guilds of the discord user
 * @param req the request route parameter
 * @param res the response rout parameter
 */
const guildsController = async (req, res) => {
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

        // Initialize Tables Upon Finding Existence
        const user_db = new UserDatabase(current_guild.id)
        const collection_db = new CollectionDatabase(current_guild.id)

        user_db.initDatabase()
        collection_db.initDatabase()

        user_db.close()
        collection_db.close()
      }
    }

    res.status(200).json(mutual_guilds)
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}

export default guildsController