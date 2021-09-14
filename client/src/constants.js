
export const EQUIPMENT_SRC_PREFIX = "/images/icon/icon_equipment_"
export const INVALID_EQUIPMENT_SRC_PREFIX = "/images/icon/icon_equipment_invalid_"

export const STAT_NAMES = [
  "hp", "atk", 
  "magic_str", "def", 
  "magic_def", "physical_critical", 
  "magic_critical", "wave_hp_recovery", 
  "wave_energy_recovery", "hp_recovery_rate",
  "energy_recovery_rate", "life_steal",  
  "energy_reduce_rate", "dodge",
  "accuracy"
]

export const STAT_DISPLAY_NAMES = {
  "hp": "HP",
  "atk": "Physical Attack",
  "def": "Physical Defense",
  "magic_str": "Magic Attack", 
  "magic_def": "Magic Defense",
  "physical_critical": "Physical Critical Rate",
  "magic_critical": "Magic Critical Rate", 
  "wave_hp_recovery": "HP Regen",
  "wave_energy_recovery": "TP Regen",
  "dodge": "Dodge",
  "life_steal": "HP Drain",
  "hp_recovery_rate": "HP Recovery Boost",
  "energy_recovery_rate": "TP Boost",
  "energy_reduce_rate": "TP Retain",
  "accuracy": "Accuracy",
  "movementSpeed": "Movement Speed"
}

export const SKILL_NAMES = ["union_burst", "main_skill_1", "main_skill_2", "ex_skill"]

export const NUMBER_TO_EQUIP = {
  "1": "equip_slot_1", 
  "2": "equip_slot_2", 
  "3": "equip_slot_3", 
  "4": "equip_slot_4", 
  "5": "equip_slot_5", 
  "6": "equip_slot_6"
}

export const EQUIP_SLOT_PREFIX = "equip_slot_"
export const ACTION_PREFIX = "action_"

export const EX_SKILL_NAMES = ["ex_skill", "ex_skill_1", "ex_skill_evolution_1"]

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

export const MANA_TO_XP = 0.375

export const NUMBER_TO_SKILL = { 
  101: "union_burst", 
  201: "main_skill_1", 
  202: "main_skill_2", 
  301: "ex_skill"
}

export const AMULET_CONVERT = [1, 10, 50]