import currentTime from './current_time.js'

/**
 * Obtains the formatted time of last normal gacha reset
 * @return {String} reset time in yyyy/mm/dd hh:mm:ss
 */
const normalResetTime = () => {
  let time = new Date()

  // 1pm UTC
  let normal_reset_1 = time.getUTCFullYear() + '/' + 
    ('0' + (time.getUTCMonth() + 1)).slice(-2) + '/' + 
    ('0' + time.getUTCDate()).slice(-2) + ' ' + '13:00:00'

  // 8pm UTC
  let normal_reset_2 = time.getUTCFullYear() + '/' + 
    ('0' + (time.getUTCMonth() + 1)).slice(-2) + '/' + 
    ('0' + time.getUTCDate()).slice(-2) + ' ' + '20:00:00'

  let normal_reset = normal_reset_2

  // if current time is before today's 1pm UTC daily
  if (currentTime() < normal_reset_1) {
    // Get yesterday's normal_reset_2
    time = new Date(new Date().getTime() - (86400 * 1000))

    normal_reset = time.getUTCFullYear() + '/' + 
      ('0' + (time.getUTCMonth() + 1)).slice(-2) + '/' + 
      ('0' + time.getUTCDate()).slice(-2) + ' ' + '20:00:00'
  } else if (currentTime() < normal_reset_2) {
    // if current time is past 1pm UTC daily but before 8pm UTC
    normal_reset = normal_reset_1
  }

  return normal_reset
}

export default normalResetTime