const AWS = require('aws-sdk');

/**
 * a promisified version of ec2.describeInstances
 */
module.exports = (params) => {
  const ec2 = new AWS.EC2();
  return new Promise((resolve, reject) => {
    ec2.describeInstances(params, (err, data) => (err ? reject(err) : resolve(data)));
  });
};
