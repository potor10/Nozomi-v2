

  // Invalid Functions (Will Be Replaced Past Here)

  getRandomUnit(rarity) {
    const stmt_str = "SELECT * FROM unit_data " + 
      "INNER JOIN unlock_unit_condition " +
      "ON unit_data.unit_id = unlock_unit_condition.unit_id " +
      "WHERE rarity = ? AND start_time < ? AND end_time > ? " + 
      "ORDER BY RANDOM() LIMIT 1"
    const stmt = this._db.prepare(stmt_str)
    const current_time = this._current.getCurrentTime()
    const query = stmt.get(rarity, current_time, current_time)
    return query
  }

  getUnitData(unit_id) {
    const stmt_str = "SELECT * FROM unit_data WHERE unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(unit_id)
    if (query === undefined) throw new ApiException(500, "ERROR: Unit Was Not Able To be Found")
    return query
  }

  getShopStaticPriceGroup(total_exchanged, total_needed) {
    const stmt_str = "SELECT * FROM shop_static_price_group WHERE " + 
      "(buy_count_to > ? OR buy_count_to = -1) AND buy_count_from <= ? ORDER BY id ASC"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.all(total_exchanged, total_needed)
    if (query === undefined) throw new ApiException(500, "ERROR: Amulet Exchange Was Not Able To be Found")
    return query
  }


  getMaxAscension(unit_id) {
    const stmt_str = "SELECT MAX(rarity) AS max_rarity FROM unit_rarity WHERE unit_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(unit_id)
    if (query === undefined) throw new ApiException(500, "ERROR: Unit Was Not Able To be Found")
    return query
  }



  getEquipmentEnhanceData(promotion_level) {
    const stmt_str = "SELECT * FROM equipment_enhance_data WHERE promotion_level = ? AND equipment_enhance_level = ?"
    const stmt = this._db.prepare(stmt_str)
    let query = null
    if (promotion_level >= 4) {
      query = stmt.get(promotion_level, 5)
    } else if (promotion_level === 3) {
      query = stmt.get(promotion_level, 3)
    } else if (promotion_level === 2) {
      query = stmt.get(promotion_level, 1)
    } else {
      return 0
    }

    return query.total_point
  }

  getMaxedEquipment(equipment_id) {
    let equipment_data = this.getEquipmentData(equipment_id)
    // Equipping an item is an automatic max refine in this bot
    const refine_data = this.getEquipmentEnhanceRate(equipment_id)

    constants.STAT_NAMES.forEach(stat => {
      equipment_data[stat] += Math.ceil(refine_data[stat] * refine_data.max_refine)
    })

    return equipment_data
  }





  getExperienceUnit(level) {
    const stmt_str = "SELECT unit_level, total_exp, " + 
      "(SELECT MAX(unit_level) from experience_unit) as max_level " + 
      "FROM experience_unit " + 
      "WHERE unit_level = ? ORDER BY total_exp DESC"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(level)
    if (query === undefined) throw new ApiException(500, "ERROR: Levels Were Not Able To be Found")
    return query
  }

  getSkillData(skill_id) {
    const stmt_str = "SELECT * FROM skill_data WHERE skill_id = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(skill_id)
    if (query === undefined) throw new ApiException(500, "ERROR: Skill Was Not Able To be Found")
    return query
  }

  getSkillCost(level) {
    const stmt_str = "SELECT * FROM skill_cost WHERE target_level = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(level)
    if (query === undefined) throw new ApiException(500, "ERROR: Skill Cost Was Not Able To be Found")
    return query
  }

  getSkillUnlockData(unlock_skill) {
    const stmt_str = "SELECT * FROM unlock_skill_data WHERE unlock_skill = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(unlock_skill)
    if (query === undefined) throw new ApiException(500, "ERROR: Skill Unlock Was Not Able To be Found")
    return query
  }

  getSkillUnlockDataFromPromotion(promotion_level) {
    const stmt_str = "SELECT * FROM unlock_skill_data WHERE promotion_level = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(promotion_level)
    return query
  }

  getLoveChara(love_level) {
    const stmt_str = "SELECT * FROM love_chara WHERE love_level = ?"
    const stmt = this._db.prepare(stmt_str)
    const query = stmt.get(love_level)
    if (query === undefined) throw new ApiException(500, "ERROR: Bond Level Was Not Able To be Found")
    return query
  }



  getActionsFromSkill(skill_id) {
    const skill_data = this.getSkillData(skill_id)
    let action_ids = []
    for (let i = 1; i <= 7; i++) {
      if (skill_data[`action_${i}`] !== 0) {
        action_ids.push(skill_data[`action_${i}`])
      }
    }

    let actions = []
    action_ids.forEach(action_id => {
      const stmt_str = "SELECT * FROM skill_action WHERE action_id = ?"
      const stmt = this._db.prepare(stmt_str)
      const query = stmt.get(action_id)
      if (query === undefined) throw new ApiException(500, "ERROR: Action Id Was Not Able To be Found")
      actions.push(query)
    })

    const skill = {
      skill_data: skill_data,
      actions: actions
    }

    return skill
  }