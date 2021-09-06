// The names of each stat in the database
export const STAT_NAMES = ["hp", "atk", "magic_str", "def", "magic_def", 
  "physical_critical", "magic_critical", "wave_hp_recovery", "wave_energy_recovery",
  "dodge", "physical_penetrate", "magic_penetrate", "life_steal", "hp_recovery_rate", 
  "energy_reduce_rate", "accuracy"]

export const SKILL_NAMES = ["union_burst", "main_skill_1", "main_skill_2", "ex_skill_1"]

export const EQUIP_SLOT_PREFIX = "equip_slot_"

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