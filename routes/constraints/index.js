const expectedBody = require('./expectedBody')


module.exports = {

	'/createAddress': expectedBody.CREATE_ADDRESS,
	'/transaction': expectedBody.TRANSACTION,
	'/findAll': expectedBody.FIND_ALL
}