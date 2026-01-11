const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  // Ye ID ko encrypt karke ek token banayega jo 30 din tak valid rahega
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;