const AWS = require('aws-sdk-mock')
const JSF = require('json-schema-faker')
const describeInstancesSchema = require('./mocks/describeInstancesSchema.json')

const resetPages = () => 1 + Math.ceil(Math.random() * 3)

var pages = resetPages()

AWS.mock('EC2', 'describeInstances', (params, cb) => {
  JSF.resolve(describeInstancesSchema).then(res => {
    var nextToken = "yes";
    pages--;
    if (!pages) {
      nextToken = null;
      pages = resetPages();
    }
    cb(null, {
      ...res,
      NextToken: nextToken
    })
  })
})
