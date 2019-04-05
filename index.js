const port = process.env.PORT || 8081;
const log = require('debug')('app:root');
const server = require('./server');

if (process.env.MOCK) {
  log("serving mock data");
  require('./setupMocks');
}

server.listen(port, function() {
  log('listening at %s', port);
});
