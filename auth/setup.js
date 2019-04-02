const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const authConf = require('../conf/auth.json');
const users = require('../conf/users.json');

const { jwtSecret, jwtHeader } = authConf;

passport.use('login', new LocalStrategy(
  function(username, password, done) {
    const user = users.find(user => {
      return user.username === username && user.password === password
    });
    return done(null, user || false);
  }
));

passport.use('verify', new JwtStrategy(
  {
    secretOrKey: jwtSecret,
    jwtFromRequest: ExtractJwt.fromHeader(jwtHeader)
  },
  (jwtPayload, done) => {
    const id = jwtPayload.id;
    const user = users.find(user => user.id === id);
    done(null, user || false);
  }
));

module.exports = server => {
  server.use(passport.initialize());
};
