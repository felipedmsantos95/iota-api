const iotaLibrary = require('@iota/core')
const iotaSeed = process.env.IOTA_SEED || 'BXDAUDPMNMDZXEHXUWEEPEHBJLTERVIZLXIWHSFLGVF9XFUKNLVBPQJHIW9ZVIEMEDBTCOZTPD9XSATJP'
const iotaAddress = process.env.IOTA_ADDRESS
const iotaProvider = process.env.IOTA_PROVIDER || 'https://nodes.devnet.thetangle.org:443'


const iota = iotaLibrary.composeAPI({
  provider: iotaProvider
})



module.exports = {
	iotaAddress,
	iotaSeed,
	iota
}