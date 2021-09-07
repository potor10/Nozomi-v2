// Import Classes
import MasterDatabase from '../databases/master_database.js'
import UserDatabase from '../databases/user_database.js'

/**
 * Adds a specified amount of exp to the user (based on level chart) and updates user level accordingly
 * @param {String} discord_id is the discord id of the user
 * @param {String} server_id is the server that is being called from
 * @return {boolean} status of request
 */
const addExp = (discord_id, server_id) => {
  const user_db = new UserDatabase(server_id)
  const master_db = new MasterDatabase()

  const user = user_db.getUser(discord_id)
  const experience_team = master_db.getExperienceTeam()

  // Experience gain is depended on your max stamina amount
  const experience_gain = experience_team[user.level-1].max_stamina

  // If new total exp is less than max 
  if (user.exp + experience_gain < experience_team[experience_team.length-1].total_exp) {
    user_db.setExp(discord_id, user.exp + experience_gain)
  } else {
    user_db.setExp(discord_id, experience_team[experience_team.length-1].total_exp)
  }

  let level_increase = 0

  // Start from user level + 1, until end of experience team. check for level ups
  for(let i = user.level; i < experience_team.length; i++) {
    if (user.exp > experience_team[i].total_exp) {
      level_increase += 1
    } else {
      break
    }
  }
  
  console.log(experience_gain)
  console.log(level_increase)

  if (level_increase > 0) user_db.setLevel(discord_id, user.level + level_increase)

  user_db.close()
}

export default addExp