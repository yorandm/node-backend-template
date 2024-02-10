const {getUserByEmail} = require('../repository/userRepository');

const getUserEmail = (email) => {
  return getUserByEmail(email);
};

module.exports = {
  getUserEmail
};