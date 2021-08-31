

// Manages Date Time Functions
module.exports = class Current {
  constructor () {

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
}
