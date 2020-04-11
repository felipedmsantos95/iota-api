const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')


const https = require('https')


const server = require('http').Server(app);
console.log('[IOTA Tangle API]')

const { errorMiddleware, constraintsMiddleware } = require('./utils/')
//const { iotaMiddleware } = require('./config/')

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
  		origin: '*'
}))

//app.use(iotaMiddleware)
app.use(constraintsMiddleware)

// All routes
app.use(require('./routes'))

app.use(errorMiddleware)

module.exports = app