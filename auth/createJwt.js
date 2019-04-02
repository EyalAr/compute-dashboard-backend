const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../conf/auth.json');

module.exports = ({ id, username }) => jwt.sign({ id, username }, jwtSecret);
