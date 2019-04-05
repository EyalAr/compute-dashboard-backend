const log = require('debug')('app:routes:login');
const passport = require('passport');
const HttpStatus = require('http-status-codes');
const createJwt = require('../auth/createJwt');
const { jwtHeader } = require('../conf/auth.json');

module.exports = (server) => {
  log('registering /login route');
  server.post(
    '/login',
    passport.authenticate('login', { session: false }),
    (req, res) => {
      const { user } = req;
      log('Creating JWT for %s', user.id);
      const jwt = createJwt(user);
      res.set(jwtHeader, jwt);
      res.status(HttpStatus.NO_CONTENT);
      res.end();
    },
  );
};
