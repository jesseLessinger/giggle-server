const { User } = require("./database");
const { hash, generateSalt} = require('./auth-helpers');


// CREATE A NEW USER
exports.createUser = (user) => {
  user.salt = generateSalt();
  user.password = hash(user.password, user.salt)
  return User.create(user);
}
