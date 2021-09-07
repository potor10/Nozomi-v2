// Import Classes
import MasterDatabase from '../../databases/master_database.js'
import CollectionDatabase from '../../databases/collection_database.js'

// Import Functions
import skillDescription from './components/skill_description.js'

// Import Constants
import { SKILL_NAMES, EX_SKILL_NAMES, ACTION_PREFIX } from '../../constants.js'

/**
 * Obtains the skill data and action info (description of the skill)
 * @param {String} discord_id discord id of the user 
 * @param {String} server_id server id of the request
 * @param {Integer} unit_id unit to get the skills of
 * @return {Object} object containing the skills of the user
 */
const skillData = (discord_id, server_id, unit_id) => {
  const master_db = new MasterDatabase()
  const collection_db = new CollectionDatabase(server_id)

  const unit = collection_db.getUnit(discord_id, unit_id)
  const unit_skill_data = master_db.getUnitSkillData(unit.unit_id)
  const skill_data = master_db.getSkillData(unit.base_id)
  const skill_action_data = master_db.getSkillAction(unit.base_id)
  
  let skills_data = {}
  skill_data.forEach(skill => {
    skills_data[skill.skill_id] = skill
  })

  let actions_data = {}
  skill_action_data.forEach(action => {
    actions_data[action.action_id] = action
  })

  let unit_skills = {}
  SKILL_NAMES.forEach(skill_name => {
    let skill_level = unit[skill_name]

    // Replace the skill name with the corresponding ex_skill (if possible)
    if (skill_name === EX_SKILL_NAMES[0]) skill_name = (unit.rarity < 5) ? EX_SKILL_NAMES[1] : EX_SKILL_NAMES[2]

    const skill_id = unit_skill_data[skill_name]
    let actions = []
    let action_idx = 1
    while(skills_data[skill_id][ACTION_PREFIX+action_idx] !== undefined) {
      if (skills_data[skill_id][ACTION_PREFIX+action_idx] !== 0) { 
        actions.push(actions_data[skills_data[skill_id][ACTION_PREFIX+action_idx]])
      }
      action_idx += 1
    }

    unit_skills[skill_name] = {
      skill_data: skills_data[skill_id],
      actions: skillDescription(unit, actions, skill_level)
    }
  })

  return unit_skills
}

export default skillData