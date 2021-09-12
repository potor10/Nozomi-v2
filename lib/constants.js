// Names of the stats 
export const STAT_NAMES = ["hp", "atk", "magic_str", "def", "magic_def", 
  "physical_critical", "magic_critical", "wave_hp_recovery", "wave_energy_recovery",
  "dodge", "physical_penetrate", "magic_penetrate", "life_steal", "hp_recovery_rate", 
  "energy_recovery_rate", "energy_reduce_rate", "accuracy"]

// Names of the skills as we save them in our database
export const SKILL_NAMES = ["union_burst", "main_skill_1", "main_skill_2", "ex_skill"]

// Names of the 
// 1. ex_skill column in our db 
// 2. unupgraded ex_skill
// 3. upgraded ex_skill rarity 5+
export const EX_SKILL_NAMES = ["ex_skill", "ex_skill_1", "ex_skill_evolution_1"]

export const EQUIP_SLOT_PREFIX = "equip_slot_"
export const ACTION_PREFIX = "action_"

export const MANA_TO_XP = 0.375

export const NUMBER_TO_SKILL = { 
  101: "union_burst", 
  201: "main_skill_1", 
  202: "main_skill_2", 
  301: "ex_skill"
}

export const NUMBER_TO_STAT = {
  "1": "hp",
  "2": "atk",
  "3": "def",
  "4": "magic_str",
  "5": "magic_def",
  "6": "physical_critical",
  "7": "magic_critical",
  "8": "dodge",
  "9": "life_steal",
  "10": "wave_hp_recovery", 
  "11": "wave_energy_recovery",
  "14": "don't know",
  "15": "hp_recovery_rate"
}


// Daily Income From Claim
export const DAILY_INCOME = {
  jewels: 1500000,
  mana: 3000000000
}

// ? discord object store
// Seconds before the user can gain exp again
export const TIME_BETWEEN_EXP = 5

// Conversion rate between duplicate to amulets 
export const AMULET_CONVERT = [1, 10, 50]

// Gacha "type" (first number of gacha_id) to rarity conversion
export const TYPE_RARITY = {
  // Premium Gacha
  2 : [79.5, 18, 2.5],

  // Focus Gacha
  3 : [79.5, 18, 2.5],

  // Double 3* Gacha
  4 : [77, 18, 5],

  // Jump Start
  6 : [79.5, 18, 2.5]
}

// The percentage of the overall rarity rate up units take
export const RATE_UP =  [10, 3, 0.7]

// Add other rate up for other rarities (make array)