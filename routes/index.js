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
	iota
	  .getNewAddress(req.body.seed, { index: 0, total: 1 })
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
// Send Data
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

function trimNull(a) {
  var c = a.indexOf('\0');
  if (c>-1) {
    return a.substr(0, c);
  }
  return a;
}

router.post('/findAll', wrapAsync(async (req, res, next) => {
	iota
	.findTransactionObjects({ addresses: [iotaAddress] })
	.then(response => {

		let transactions = response.map( function (transaction) {
			let trytes = transaction.signatureMessageFragment.slice(0, -1)
			let data = Converter.trytesToAscii(trytes)


			transaction.signatureMessageFragment  = data

			return transaction
		})
		res.send(transactions)
	})
	.catch(err => {
		console.error(err)
		res.status(500).json(err)	
	})
}))


module.exports = router