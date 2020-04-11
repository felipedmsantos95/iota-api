const request = require('supertest')
const app = require('../src/app')
const addr = "MKLP9TTZRMWLCJGEPDPEJBAIJKMJZCUXDRITVHAWEMO9DWBNXNSCIPJVA9GKVMIPKVRKRN9HCUXLZIIPB"

//Testing cases for the product entity
describe('IOTA_TANGLE', () => {

    it('should be able to create a new product', async () => {
        const response = await request(app)
                .post('/findAll')
                .send({        
                    address: addr,
                })

        
        expect(response.body).toHaveProperty('id')
    })

    


})
