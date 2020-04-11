const express = require('express')
const router = express.Router()
const { wrapAsync, asciiObj } = require('../utils/')
const { iota, iotaSeed, iotaAddress } = require('../config/')
const Converter = require('@iota/converter')


///////////////////////////////
// Create an address from a new seed
/////
// First: run this code in a unix based terminal to generate an 81 Tryte seed.
// 'cat /dev/urandom |LC_ALL=C tr -dc 'A-Z9' | fold -w 81 | head -n 1'
// Paste the output of the above code into the 'seed' section below.
///////////////////////////////
router.post('/createAddress', wrapAsync(async (req, res, next) => {

	let seed
	(!req.body.seed)? seed = iotaSeed : seed = req.body.seed

	iota
	  .getNewAddress(seed, { index: 0, total: 1 })
	  .then(address => {
	    console.log('Your address is: ' + address)
	    console.log('Paste this address into https://faucet.devnet.iota.org')
	    res.send({address: address[0]})
	  })
	  .catch(err => {
	  	console.log(err)
	  	res.status(500).json(err)
	  })
}))



///////////////////////////////
// To use in a LogVacinas App
///////////////////////////////
router.post('/validateVaccine', wrapAsync(async (req, res, next) => {
	let request = asciiObj(req.body)

	const message = Converter.asciiToTrytes(JSON.stringify(request))
	const transfers = [
		{
			value: 0,
			address: iotaAddress, // Where the data is being sent
			message: message // The message converted into trytes
		}
	]

	iota
	.prepareTransfers(iotaSeed, transfers)
	.then(trytes => iota.sendTrytes(trytes, 3, 9))
	.then(bundle => {
		console.log('Transfer successfully sent')
		bundle.map(tx => {
			console.log(tx)
			res.send(tx)
		})
	})
	.catch(err => {
		console.log(err)
		res.status(500).json(err)
	})
}))


///////////////////////////////
// To send any data
///////////////////////////////
router.post('/transaction', wrapAsync(async (req, res, next) => {
	let request = asciiObj(req.body)

	const message = Converter.asciiToTrytes(JSON.stringify(request))
	const transfers = [
		{
			value: 0,
			address: iotaAddress, // Where the data is being sent
			message: message // The message converted into trytes
		}
	]

	iota
	.prepareTransfers(iotaSeed, transfers)
	.then(trytes => iota.sendTrytes(trytes, 3, 9))
	.then(bundle => {
		console.log('Transfer successfully sent')
		bundle.map(tx => {
			console.log(tx)
			res.send(tx)
		})
	})
	.catch(err => {
		console.log(err)
		res.status(500).json(err)
	})
}))


///////////////////////////////
// Fetch your messages in tangle
///////////////////////////////

function prettyResult(arrayTransactionsObjects) {
	let transactions = arrayTransactionsObjects.map( function (transaction) {
			let trytes = transaction.signatureMessageFragment.slice(0, -1)
			let data = Converter.trytesToAscii(trytes)

			//To remove null caracteres
			let dataClean = data.replace(/\0/g, '')
			//To convert string to Object
			let jsonData = JSON.parse(dataClean)

			transaction.signatureMessageFragment  = jsonData
			return transaction
	})
	return transactions
}


router.post('/findAll', wrapAsync(async (req, res, next) => {

	//To verifiy if was especified address in the body of request, if not, the address of .env will be fetched
	let addressToRequest = (req.body.address) ? req.body.address : iotaAddress

	iota
	.findTransactionObjects({ addresses: [addressToRequest] })
	.then(response => {
		let transactions = prettyResult(response)	
		res.send(transactions)
	})
	.catch(err => {
		console.error(err)
		res.status(500).json(err)	
	})
}))


module.exports = router