const expectedBody = require('./expected-body')


module.exports = {

	'/createAddress': expectedBody.CREATE_ADDRESS,
	'/transaction': expectedBody.TRANSACTION,
	'/findAll': expectedBody.FIND_ALL
}