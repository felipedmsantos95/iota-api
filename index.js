const dotenv = require('dotenv')
dotenv.config();

const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')


const portHttp = process.env.PORT_HTTP || 4000
const portHttps = process.env.PORT_HTTPS || 5000

const https = require('https')
const fs = require('fs')

const server = require('http').Server(app);
const { errorMiddleware, constraintsMiddleware } = require('./utils/')

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
  		origin: '*'
}))
app.use(constraintsMiddleware)
app.use(errorMiddleware)
// All routes
app.use(require('./routes'))

process.on('unhandledRejection', (reason, promise) => {
  //console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
})


let serverHttp = app.listen(portHttp)
console.log('[IOTA Tangle API]')
console.log('HTTP - Port:', portHttp)


//Running with HTTPS
let serverHttps
try {
	const privateKey = fs.readFileSync(process.env.DOMAIN_SERVERKEY)
	const certificate = fs.readFileSync(process.env.DOMAIN_SERVERCERT)
	let credentials = {
		key: privateKey,
		cert: certificate
	}

	serverHttps = https.createServer(credentials, app).listen(portHttps)
	console.log('HTTPS - Port:', portHttps)	
}
catch (err) {
	Promise.reject(new Error('HTTPS - Verificar chave e certificado do servidor HTTPS.'))
}

process.on('SIGINT', () => {
  console.log('Received SIGINT. Press Control-C to exit, Press Control-D to logout.');
  serverHttp.close()
  if(serverHttps)
  	serverHttps.close()  
});