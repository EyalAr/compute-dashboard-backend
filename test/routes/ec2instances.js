const chai = require('chai')
chai.use(require('chai-http'))
const assert = chai.assert
const server = require('../../server')
const createJwt = require('../../auth/createJwt')
const { jwtHeader } = require('../../conf/auth.json')
const users = require('../../conf/users.json')
const validJwt = createJwt(users[0])

require('../../setupMocks')

describe('routes/ec2instances', () => {
  var requester

  before(() => {
    requester = chai.request(server).keepOpen()
  })

  after(() => {
    requester.close()
  })

  describe('GET', () => {
    it('should return 401 if no JWT provided', done => {
      requester
        .get('/ec2-instances')
        .query({
          range: '[0,9]',
          sort: '["az","DESC"]'
        })
        .end((err, res) => {
          assert.equal(res.status, 401)
          done()
        })
    })

    it('should return 401 if JWT is invalid', done => {
      requester
        .get('/ec2-instances')
        .query({
          range: '[0,9]',
          sort: '["az","DESC"]'
        })
        .set(jwtHeader, "1234567890")
        .end((err, res) => {
          assert.equal(res.status, 401)
          done()
        })
    })

    it('should return 200 if JWT is valid', done => {
      requester
        .get('/ec2-instances')
        .query({
          range: '[0,9]',
          sort: '["az","DESC"]'
        })
        .set(jwtHeader, validJwt)
        .end((err, res) => {
          assert.equal(res.status, 200)
          done()
        })
    })
  })
});
