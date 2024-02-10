const userRepository =require('../repository/userRepository');

const getUserByEmail = (email) => {
  return userRepository.getUserByEmail(email);
};

module.exports = {
  getUserByEmail
};