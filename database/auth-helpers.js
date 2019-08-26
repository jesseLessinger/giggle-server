const { User } = require("./database");
const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local');


// PASSWORD HASHING HELPERS
const hash = (data, salt = '') => {
  const shasum = crypto.createHash('sha256');
  shasum.update(data + salt);
  return shasum.digest('hex');
};

const generateSalt = () => {
  return crypto.randomBytes(32).toString('hex');
}

// VERIFY A USER PASSWORD
const verifyPassword = (user, attempt) => {
  return user.password === hash(attempt, user.salt)
}

// PASSPORT CONFIGURATION
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ where: { username } }).then( (user) => {
      if (!user) { return done(null, false); }
      if (!verifyPassword(user, password)) { return done(null, false); }
      return done(null, user);
    }).catch((err) => {
      return done(err);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
exports.passport = passport


