const chai = require('chai')
chai.use(require('chai-http'))
const assert = chai.assert
const server = require('../../server')
const { jwtHeader } = require('../../conf/auth.json')
const { username, password } = require('../../conf/users.json')[0]

describe('routes/login', () => {
  var requester

  before(() => {
    requester = chai.request(server).keepOpen()
  })

  after(() => {
    requester.close()
  })

  it('should return 401 if username is incorrect', done => {
    requester
      .post('/login')
      .send({
        username: "12345",
        password
      })
      .end((err, res) => {
        assert.equal(res.status, 401)
        done()
      })
  })

  it('should return 401 if password is incorrect', done => {
    requester
      .post('/login')
      .send({
        username,
        password: "12345"
      })
      .end((err, res) => {
        assert.equal(res.status, 401)
        done()
      })
  })

  it('should return 204 and JWT header if credentials are correct', done => {
    requester
      .post('/login')
      .send({ username, password })
      .end((err, res) => {
        assert.equal(res.status, 204)
        assert.exists(res.header[jwtHeader])
        done()
      })
  })
});
