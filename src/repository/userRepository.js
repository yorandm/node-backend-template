const {
  tables,
  getKnex
} = require('../data/index');


const getUserByEmail = async (email) => {
  return getKnex()(tables.user).select(["id", "email", "isVerified"]).where({
    email
  }).first();
}

module.exports = {
  getUserByEmail,
};