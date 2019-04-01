const passport = require('passport');
const LocalStrategy = require('passport-local');

const users = require('./conf/users.json');

function setupAuth(server, mainPage = '/', loginPage = '/login') {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      const user = users.find(user => {
        return user.username === username && user.password === password
      });
      return done(null, user || false);
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.username);
  });
  
  passport.deserializeUser(function(username, done) {
    const user = users.find(user => user.username == username)
    done(err, user);
  });

  server.use(passport.initialize());
  server.use(passport.session());

  server.post('/login', passport.authenticate('local', {
    failureRedirect: loginPage
  }), (req, res) => {
    res.redirect(mainPage);
  });

  server.get('/logout', (req, res) => {
    req.logout();
    res.redirect(mainPage);
  });
}

module.exports = setupAuth;
