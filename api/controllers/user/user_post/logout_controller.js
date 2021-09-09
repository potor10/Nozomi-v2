/**
 * Logs out the user by destroying the current session
 * @param req the request route parameter
 * @param res the response rout parameter
 */
const logoutController = (req, res) => {
  req.session.destroy()
  res.status(200).send('Successfully Logged Out')
}

export default logoutController