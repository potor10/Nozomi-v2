// Module Imports
import fetch from 'node-fetch'

/**
 * Requests the discord user profile information
 * @param req the request route parameter
 * @param res the response rout parameter
 */
const profileController = async (req, res) => {
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

export default profileController
