import gachaData from '../../../../lib/gacha/gacha_components/gacha_data.js'
import gachaBanner from '../../../../lib/banner/gacha_banner.js'

const bannerController = async (req, res) => {
  if (req.session.login_status === true) {
    try {
      const current_gachas = gachaData(req.session.user_data.id, req.params.server_id)
      const current_banner = gachaBanner()

      const gacha_data = {
        current_gachas: current_gachas,
        current_banner: current_banner
      }

      res.status(200).json(gacha_data)
    } catch (e) {
      console.log(e)
      res.status(e.getStatus()).send(e.getErrorMessage())
    }
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}

export default bannerController
