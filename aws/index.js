const MAX_RESULTS = 100;
const AWS = require('aws-sdk');
const ec2 = new AWS.EC2();

/**
 * a promisified version of ec2.describeInstances
 */
const describeInstances = (params) => {
  return new Promise((resolve, reject) => {
    ec2.describeInstances(params, (err, data) => {
      err ? reject(err) : resolve(data)
    });
  });
};

const extractInstanceData = i => ({
  name: (i.Tags.filter(t => t.Key = 'Name')[0] || {}).Value,
  id: i.InstanceId,
  type: i.InstanceType,
  state: i.State.Name,
  az: i.Placement.AvailabilityZone,
  public_ip: i.PublicIpAddress,
  private_ip: i.PrivateIpAddress
});

class Retriever {
  constructor () {
    this.cachedInstances = [];
    this.nextToken;
  }

  ensure (to) {
    return new Promise((resolve, reject) => {
      if (
        this.cachedInstances[to] ||
        (this.cachedInstances.length && !this.nextToken)
      ) {
        resolve();
      } else {
        describeInstances({
          MaxResults: MAX_RESULTS,
          NextToken: this.nextToken
        }).then(data => {
          data.Reservations.forEach(r => {
            r.Instances.forEach(i => {
              this.cachedInstances.push(extractInstanceData(i));
            });
          });
          this.nextToken = data.NextToken;
        }).then(() => this.ensure(to)).then(resolve, reject);
      }
    });
  };
  
  get (from, to) {
    return this.ensure(to).then(() => {
      return this.cachedInstances.slice(from, to + 1);
    });
  };
};

const getEc2Instances = (from, to) => {
  const retriever = new Retriever();
  return retriever.get(from, to);
};

module.exports = {
  getEc2Instances
};
