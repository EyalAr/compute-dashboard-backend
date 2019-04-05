const AWS = require('aws-sdk-mock');
const JSF = require('json-schema-faker');
const describeInstancesSchema = require('./mocks/describeInstancesSchema');

const resetPages = () => 1 + Math.ceil(Math.random() * 3);

let pages = resetPages();

AWS.mock('EC2', 'describeInstances', (params, cb) => {
  JSF.resolve(describeInstancesSchema).then((res) => {
    let nextToken = 'yes';
    pages -= 1;
    if (!pages) {
      nextToken = null;
      pages = resetPages();
    }
    cb(null, {
      ...res,
      NextToken: nextToken,
    });
  });
});
