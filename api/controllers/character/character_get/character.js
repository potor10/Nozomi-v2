import MasterDatabase from "../../../../lib/databases/master_database.js"
import CollectionDatabase from "../../../../lib/databases/collection_database.js"

const character = async (req, res) => {
  if (req.session.login_status === true) {
    if (req.session.mutual_guilds[req.params.server_id] !== undefined) {
      const master_db = new MasterDatabase()
      const collection_db = new CollectionDatabase(req.params.server_id)
      const unit = collection_db.getUnit(req.session.user_data.id, req.params.unit_id)
      try {
        const character_data = {
          rarity_data: master_db.getUnitRarity(req.params.unit_id),
          shop_static_price_group_data: master_db.getShopStaticPriceGroup(),

          experience_unit_data: master_db.getExperienceUnit(),

          promotion_data: master_db.getUnitPromotion(req.params.unit_id),
          promotion_stats_data: master_db.getUnitPromotionStatus(req.params.unit_id),

          equipment_data: master_db.getEquipmentData(),
          equipment_enhance_data: master_db.getEquipmentEnhance(),

          skill_data: master_db.getSkillData(unit.base_id),
          skill_action_data: master_db.getSkillAction(unit.base_id),
          skill_cost_data: master_db.getSkillCost(),

          bond_data: master_db.getBondStory(unit.base_id),
          bond_cost_data: master_db.getLoveChara(),

          unit: unit
        }
        res.status(200).json(character_data)
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

export default character