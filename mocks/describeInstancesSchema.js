const JSF = require('json-schema-faker');

JSF.extend('faker', () => require('faker')); // eslint-disable-line

module.exports = {
  Reservations: {
    type: 'array',
    minItems: 1,
    maxItems: 3,
    items: {
      Instances: {
        type: 'array',
        minItems: 10,
        maxItems: 30,
        items: {
          Tags: {
            type: 'array',
            minItems: 1,
            maxItems: 1,
            items: {
              Key: 'Name',
              Value: {
                type: 'string',
                faker: 'lorem.word',
              },
            },
          },
          InstanceId: {
            type: 'string',
            faker: 'lorem.word',
          },
          InstanceType: {
            enum: ['a1.medium', 'a1.large', 'a1.xlarge', 'a1.2xlarge', 'a1.4xlarge'],
          },
          State: {
            Name: {
              enum: ['running', 'stopped', 'terminated', 'pending', 'stopping', 'shutting-down'],
            },
          },
          Placement: {
            AvailabilityZone: {
              enum: ['us-east-1', 'eu-west-1', 'ap-southeast-1', 'ap-northeast-2'],
            },
          },
          PublicIpAddress: {
            type: 'string',
            faker: 'internet.ip',
          },
          PrivateIpAddress: {
            type: 'string',
            faker: 'internet.ip',
          },
        },
      },
    },
  },
};
