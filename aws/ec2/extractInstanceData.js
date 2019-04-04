/**
 * Extract only the fields we are interested in from the AWS SDK EC2 instance
 * payload.
 */
module.exports = i => ({
  name: (i.Tags.filter(t => t.Key = 'Name')[0] || {}).Value,
  id: i.InstanceId,
  type: i.InstanceType,
  state: i.State.Name,
  az: i.Placement.AvailabilityZone,
  public_ip: i.PublicIpAddress,
  private_ip: i.PrivateIpAddress
});
