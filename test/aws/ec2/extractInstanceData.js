const chai = require('chai');

const { assert } = chai;
const JSF = require('json-schema-faker');
const extractInstanceData = require('../../../aws/ec2/extractInstanceData');
const describeInstancesSchema = require('../../../mocks/describeInstancesSchema');

describe('aws/extractInstanceData', () => {
  let instance;
  before(() => JSF.resolve(describeInstancesSchema).then((data) => {
    instance = extractInstanceData(data.Reservations[0].Instances[0]);
  }));

  it('should return an object', () => {
    assert.isObject(instance);
  });
  it('should return an object with id field', () => {
    assert.property(instance, 'id');
  });
  it('should return an object with type field', () => {
    assert.property(instance, 'type');
  });
  it('should return an object with state field', () => {
    assert.property(instance, 'state');
  });
  it('should return an object with az field', () => {
    assert.property(instance, 'az');
  });
  it('should return an object with public_ip field', () => {
    assert.property(instance, 'public_ip');
  });
  it('should return an object with private_ip field', () => {
    assert.property(instance, 'private_ip');
  });
});
