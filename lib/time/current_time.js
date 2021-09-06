/**
 * Obtains the current formatted time
 * @return {String} current time in yyyy/mm/dd hh:mm:ss
 */
const currentTime = () => {
  const time = new Date()
  const time_formatted = time.getUTCFullYear() + '/' + 
    ('0' + (time.getUTCMonth() + 1)).slice(-2) + '/' + 
    ('0' + time.getUTCDate()).slice(-2) + ' ' +
    ('0' + time.getUTCHours()).slice(-2) + ':' +
    ('0' + time.getUTCMinutes()).slice(-2) + ':' +
    ('0' + time.getUTCSeconds()).slice(-2)
  return time_formatted
}

export default currentTime