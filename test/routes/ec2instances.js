const chai = require('chai');
chai.use(require('chai-http'));
const { assert } = require('chai');
const AWS = require('aws-sdk-mock');
const JSF = require('json-schema-faker');
const server = require('../../server');
const createJwt = require('../../auth/createJwt');
const { jwtHeader } = require('../../conf/auth.json');
const users = require('../../conf/users.json');

const validJwt = createJwt(users[0]);
const describeInstancesSchema = require('../../mocks/describeInstancesSchema');

describe('routes/ec2instances', () => {
  let requester;

  before(() => {
    requester = chai.request(server).keepOpen();
    AWS.mock('EC2', 'describeInstances', (params, cb) => {
      // payload is not important, we're just checking http return status
      JSF.resolve(describeInstancesSchema).then(payload => cb(null, payload));
    });
  });

  after(() => {
    requester.close();
    AWS.restore();
  });

  describe('GET', () => {
    it('should return 401 if no JWT provided', (done) => {
      requester
        .get('/ec2-instances')
        .query({
          range: '[0,9]',
          sort: '["az","DESC"]',
        })
        .end((err, res) => {
          assert.equal(res.status, 401);
          done();
        });
    });

    it('should return 401 if JWT is invalid', (done) => {
      requester
        .get('/ec2-instances')
        .query({
          range: '[0,9]',
          sort: '["az","DESC"]',
        })
        .set(jwtHeader, '1234567890')
        .end((err, res) => {
          assert.equal(res.status, 401);
          done();
        });
    });

    it('should return 200 if JWT is valid', (done) => {
      requester
        .get('/ec2-instances')
        .query({
          range: '[0,9]',
          sort: '["az","DESC"]',
        })
        .set(jwtHeader, validJwt)
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });
  });
});
