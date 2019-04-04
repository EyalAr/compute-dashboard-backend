const chai = require('chai')
chai.use(require('chai-as-promised'))
const assert = chai.assert
const JSF = require('json-schema-faker')
const describeInstances = require('../../../aws/ec2/describeInstances')
const describeInstancesSchema = require('../../../mocks/describeInstancesSchema.json')
const AWS = require('aws-sdk-mock')

describe('aws/describeInstances', () => {

  describe('AWS API returns data', () => {
    before(() => {
      AWS.mock('EC2', 'describeInstances', (params, cb) => {
        JSF.resolve(describeInstancesSchema).then(res => {
          cb(null, res)
        })
      })
    })

    after(() => {
      AWS.restore()
    })

    it('should return a resolved promise', () => {
      return assert.isFulfilled(describeInstances({}))
    })
  })

  describe('AWS API returns error', () => {
    before(() => {
      AWS.mock('EC2', 'describeInstances', (params, cb) => {
        cb(new Error())
      })
    })

    after(() => {
      AWS.restore()
    })

    it('should return a rejected promise', () => {
      return assert.isRejected(describeInstances({}))
    })
  })

});
