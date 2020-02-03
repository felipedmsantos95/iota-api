const expectedBody = require('./expected-body')


module.exports = {

	'/createAddress': expectedBody.CREATE_ADDRESS,
	'/validateVaccine': expectedBody.LOGVACINAS_APP_TRANSACTION,
	'/transaction': expectedBody.TRANSACTION,
	'/findAll': expectedBody.FIND_ALL
}