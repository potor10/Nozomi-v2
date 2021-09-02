// Dependencies
require('dotenv').config()

const NozomiApi = require('./api/app')

const app = new NozomiApi()
app.run()

