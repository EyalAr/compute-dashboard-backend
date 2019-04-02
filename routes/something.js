const passport = require('passport');
const HttpStatus = require('http-status-codes');
const createJwt = require('../auth/createJwt');
const { jwtHeader } = require('../conf/auth.json');

module.exports = server => {
  server.get(
    '/something',
    passport.authenticate('verify', { session: false }),
    (req, res) => {
      res.status(HttpStatus.NO_CONTENT);
      res.end();
    }
  );
};
