const port = process.env.PORT || 8080;

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const server = express();
server.use(bodyParser.json()); 
server.use(bodyParser.urlencoded({ extended: true }));
server.use(session({ secret: 'demo' }));

require('./setupAuth')(server);

server.listen(port, function() {
  console.log('listening at %s', port);
});
