const log = require('debug')('app:routes:ec2instances');
const passport = require('passport');
const HttpStatus = require('http-status-codes');
const aws = require('../aws');

module.exports = server => {
  server.get(
    '/ec2-instances',
    passport.authenticate('verify', { session: false }),
    (req, res) => {
      log('request params %o', req.query);
      const [ from, to ] = JSON.parse(req.query.range);
      aws.getEc2Instances(from, to).then(data => {
        res.send(data);
        res.end();
      }).catch(err => {
        log(err);
        res.status(HttpStatus.BAD_GATEWAY);
        res.end();
      });
    }
  );
};
