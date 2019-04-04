const AWS = require('aws-sdk-mock')
const JSF = require('json-schema-faker')

const resetPages = () => 1 + Math.ceil(Math.random() * 3)

var pages = resetPages()
const schema = {
  "Reservations": {
    "type": "array",
    "minItems": 1,
    "maxItems": 3,
    "items": {
    "Instances": {
      "type": "array",
      "minItems": 10,
      "maxItems": 30,
      "items": {
        "Tags": {
          "type": "array",
          "minItems": 1,
          "maxItems": 1,
          "items": {
            "Key": "Name",
            "Value": {
              "type": "string"
            }
          }
        },
        "InstanceId": {
          "type": "string",
          "faker": "lorem.word"
        },
        "InstanceType": {
          "enum": ["a1.medium", "a1.large", "a1.xlarge", "a1.2xlarge", "a1.4xlarge"]
        },
        "State": {
          "Name": {
            "enum": ["running", "stopped", "terminated", "pending", "stopping", "shutting-down"]
          }
        },
        "Placement": {
          "AvailabilityZone": {
            "enum": ["us-east-1", "eu-west-1", "ap-southeast-1", "ap-northeast-2"]
          }
        },
        "PublicIpAddress": {
          "type": "string",
          "faker": "internet.ip"
        },
        "PrivateIpAddress": {
          "type": "string",
          "faker": "internet.ip"
        }
      }
    }
    }
  }
}

AWS.mock('EC2', 'describeInstances', (params, cb) => {
  JSF.resolve(schema).then(res => {
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
