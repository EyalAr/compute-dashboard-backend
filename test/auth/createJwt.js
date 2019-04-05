const { assert } = require('chai');
const jwt = require('jsonwebtoken');
const createJwt = require('../../auth/createJwt');

describe('auth/createJwt', () => {
  const user = {
    id: 'id-1',
    username: 'name',
    password: 'password',
  };
  const payload = jwt.decode(createJwt(user));
  it('should include user id in JWT payload', () => {
    assert.equal(payload.id, user.id);
  });
  it('should include user username in JWT payload', () => {
    assert.equal(payload.username, user.username);
  });
  it('should not include user password in JWT payload', () => {
    assert.notProperty(payload, 'password');
  });
});
