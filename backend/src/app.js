const express = require('express')
const cors = require('cors')
const songRouter = require('./routes/song.route')



const app = express()
app.use(express.json())
app.use(cors())
app.use('/',songRouter)



module.exports = app