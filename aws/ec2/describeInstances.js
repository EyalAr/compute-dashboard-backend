const AWS = require('aws-sdk');
const ec2 = new AWS.EC2();

/**
 * a promisified version of ec2.describeInstances
 */
module.exports = (params) => {
  return new Promise((resolve, reject) => {
    ec2.describeInstances(params, (err, data) => {
      err ? reject(err) : resolve(data)
    });
  });
};
