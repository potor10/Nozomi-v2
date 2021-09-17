import currentTime from './current_time.js'

/**
 * Obtains the formatted time of last daily reset
 * @return {String} reset time in yyyy/mm/dd hh:mm:ss
 */
const dailyTime = () => {
  let time = new Date()
  let daily_reset = time.getUTCFullYear() + '/' + 
    ('0' + (time.getUTCMonth() + 1)).slice(-2) + '/' + 
    ('0' + time.getUTCDate()).slice(-2) + ' ' + '13:00:00'

  if (currentTime() < daily_reset) {
    // Get yesterday's daily reset
    time = new Date(new Date().getTime() - (86400 * 1000))

    daily_reset = time.getUTCFullYear() + '/' + 
      ('0' + (time.getUTCMonth() + 1)).slice(-2) + '/' + 
      ('0' + time.getUTCDate()).slice(-2) + ' ' + '13:00:00'
  }

  return daily_reset
}

export default dailyTime