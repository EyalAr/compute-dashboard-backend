const express = require('express');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json()); 

require('./auth/setup')(server);
require('./routes/login')(server);
require('./routes/ec2instances')(server);

module.exports = server
