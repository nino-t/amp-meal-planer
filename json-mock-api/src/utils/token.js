const TokenGenerator = require("uuid-token-generator");

module.exports = {
  generateToken: (userId, expire = 1) => {
    const token = new TokenGenerator(256, TokenGenerator.BASE62);
    return {
      user_id: userId,
      token: token.generate(),
      exp: Math.floor(Date.now() / 1000) + expire * 60 * 60, // Add x hours
    };
  },
};
