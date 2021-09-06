export const STAT_NAMES = ["hp", "atk", "magic_str", "def", "magic_def", 
  "physical_critical", "magic_critical", "wave_hp_recovery", "wave_energy_recovery",
  "dodge", "physical_penetrate", "magic_penetrate", "life_steal", "hp_recovery_rate", 
  "energy_reduce_rate", "accuracy"]

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

export const SKILL_NAMES = ["union_burst", "main_skill_1", "main_skill_2", "ex_skill_1"]

export const EQUIP_SLOT_PREFIX = "equip_slot_"

export const NUMBER_TO_EQUIP = {
  "1": "equip_slot_1", 
  "2": "equip_slot_2", 
  "3": "equip_slot_3", 
  "4": "equip_slot_4", 
  "5": "equip_slot_5", 
  "6": "equip_slot_6"
}

export const SKILL_TO_NUMBER = {
  "union_burst": 101, 
  "main_skill_1": 201,
  "main_skill_2": 202,
  "ex_skill_1": 301 
}

export const NUMBER_TO_SKILL = { 
  "101": "union_burst", 
  "201": "main_skill_1", 
  "202": "main_skill_2", 
  "301": "ex_skill_1"
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

export const ACTION8DETAIL = {
  "1": "Slow",
  "2": "Haste",
  "3": "Paralyze",
  "4": "Freeze",
  "5": "Bind",
  "6": "Sleep",
  "7": "Stun",
  "8": "Petrify",
  "9": "Confine"
}

export const ACTION9DETAIL = {
  "0": "Confine Damage",
  "1": "Poison",
  "2": "Burn",
  "3": "Curse"
}

export const BUFF_NUMBER_TO_STAT = {
  "1": "hp",
  "2": "atk",
  "3": "def",
  "4": "magic_str",
  "5": "magic_def",
  "6": "magic_critical",
  "7": "physical_critical",
  "8": "dodge",
  "9": "life_steal",
  "10": "wave_hp_recovery",
  "11": "movementSpeed",
  "14": "don't know"
}

export const MANA_TO_XP = 0.375