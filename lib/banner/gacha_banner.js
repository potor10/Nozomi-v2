import MasterDatabase from '../databases/master_database.js'
import currentTime from '../time/current_time.js'

const gachaBanner = () => {
  const master_db = new MasterDatabase()
  const current_time = currentTime()

  const banner = master_db.getBanner(current_time)
  master_db.close()

  let gacha_banner = undefined
  for (let i = 0; i < banner.length; i++) {
    if (parseInt((''+banner[i].banner_id).charAt(0)) === 1) {
      // found the gacha banner
      gacha_banner = banner[i]
      break
    }
  }

  return gacha_banner
}

export default gachaBanner