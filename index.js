const port = process.env.PORT || 8080;

const express = require('express');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json()); 

require('./auth/setup')(server);
require('./routes/login')(server);
require('./routes/something')(server);

server.listen(port, function() {
  console.log('listening at %s', port);
});
