const log = require('debug')('app:root');

const port = process.env.PORT || 8081;

const express = require('express');
const bodyParser = require('body-parser');

if (process.env.MOCK) {
  log("serving mock data");
  require('./test/setupMocks');
}

const server = express();
server.use(bodyParser.json()); 

require('./auth/setup')(server);
require('./routes/login')(server);
require('./routes/ec2instances')(server);

server.listen(port, function() {
  log('listening at %s', port);
});
