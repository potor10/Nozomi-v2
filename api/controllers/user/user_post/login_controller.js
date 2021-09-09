// Module Imports
import fetch from 'node-fetch'

/**
 * Logs in the user from discord OAuth and sets up a user session
 * @param req the request route parameter
 * @param res the response rout parameter
 */
const loginController = async (req, res) => {
  if (req.session.login_status !== true) {
    const code = req.body.code
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

export default loginController