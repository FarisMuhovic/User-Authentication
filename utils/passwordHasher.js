const bcrypt = require("bcryptjs");
const saltRounds = 12;

function hashPassword(password) {
  return bcrypt.hashSync(password, saltRounds);
}
function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}
module.exports = {
  hashPassword,
  comparePassword,
};
