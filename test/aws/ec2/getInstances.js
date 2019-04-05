const chai = require('chai')
chai.use(require('chai-sorted'))
const assert = chai.assert
const expect = chai.expect
const JSF = require('json-schema-faker')
const getInstances = require('../../../aws/ec2/getInstances')
const describeInstancesSchema = require('../../../mocks/describeInstancesSchema.json')
const AWS = require('aws-sdk-mock')

describe('aws/getInstances', () => {
  const FROM = 2
  const TO = 5
  const SORT_BY = "az"
  const SORT_DESC = false

  var realTotal
  var result
  var resultTotal

  before(done => {
    JSF.resolve(describeInstancesSchema).then(res => {
      realTotal = res.Reservations.reduce((t, r) => {
        return t + r.Instances.length
      }, 0)
      AWS.mock('EC2', 'describeInstances', (params, cb) => {
        cb(null, res)
      })
      done()
    })
  })

  before(() => {
    return getInstances(FROM, TO, SORT_BY, SORT_DESC).then(data => {
      result = data.instances
      resultTotal = data.total
    })
  })

  after(() => {
    AWS.restore()
  })

  it('should return the correct total count', () => {
    assert.equal(resultTotal, realTotal)
  })

  it('should return the correct number of instances', () => {
    assert.equal(result.length, TO - FROM + 1)
  })

  it('should return instances in the correct order', () => {
    expect(result).to.be.sortedBy(SORT_BY, { descending: SORT_DESC })
  })
});
