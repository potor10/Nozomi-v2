import MasterDatabase from "../../../../lib/databases/master_database.js"
import CollectionDatabase from "../../../../lib/databases/collection_database.js"

const characters = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.params.server_id] !== undefined) {
      const master_db = new MasterDatabase()
      const collection_db = new CollectionDatabase(req.params.server_id)
      try {
        const collection = {
          rarity_data: master_db.getUnitRarity(),
          promotion_data: master_db.getUnitPromotion(),
          units: collection_db.getAllUnits(req.session.user_data.id)
        }
        res.status(200).json(collection)
      } catch (e) {
        console.log(e)
        res.status(e.getStatus()).send(e.getErrorMessage())
      }
      master_db.close()
      collection_db.close()
    } else {
      res.status(400).send('Please Select A Valid Server')
    }
  } else {
    res.status(401).send('You Must Be Logged In')
  }
}

export default characters