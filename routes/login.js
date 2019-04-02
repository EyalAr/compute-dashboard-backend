const passport = require('passport');
const HttpStatus = require('http-status-codes');
const createJwt = require('../auth/createJwt');
const { jwtHeader } = require('../conf/auth.json');

module.exports = server => {
  server.post(
    '/login',
    passport.authenticate('login', { session: false }),
    (req, res) => {
      const { user } = req;
      const jwt = createJwt(user);
      res.set(jwtHeader, jwt);
      res.status(HttpStatus.NO_CONTENT);
      res.end();
    }
  );
};
