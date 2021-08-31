

// Manages Date Time Functions
module.exports = class Current {
  constructor() {

  }

  getCurrentTime() {
    const current = new Date()
    const current_time = current.getUTCFullYear() + '/' + 
      ('0' + (current.getUTCMonth() + 1)).slice(-2) + '/' + 
      ('0' + current.getUTCDate()).slice(-2) + ' ' +
      ('0' + current.getUTCHours()).slice(-2) + ':' +
      ('0' + current.getUTCMinutes()).slice(-2) + ':' +
      ('0' + current.getUTCSeconds()).slice(-2)

    return current_time
  }

  getDaily() {
    let current = new Date()
    let current_daily = current.getUTCFullYear() + '/' + 
      ('0' + (current.getUTCMonth() + 1)).slice(-2) + '/' + 
      ('0' + current.getUTCDate()).slice(-2) + ' ' + '13:00:00'

    if (this.getCurrentTime() < current_daily) {
      current = new Date(new Date().getTime() - (86400 * 1000))
      current_daily = current.getUTCFullYear() + '/' + 
        ('0' + (current.getUTCMonth() + 1)).slice(-2) + '/' + 
        ('0' + current.getUTCDate()).slice(-2) + ' ' + '13:00:00'
    }

    return current_daily
  }
}
