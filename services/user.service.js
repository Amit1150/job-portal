const User = require('../models/user');

/** get user by username */
function getUser(username) {
  return new Promise(function (resolve, reject) {
    User.findOne({ username },
      async (err, user) => {
        if (err) {
          return reject(err);
        }
        return resolve(user);
      }
    )
  });
}

/** Register User */
function register(req) {
  return new Promise(async function (resolve, reject) {
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      profilePicId: req.file.filename,
      role: req.body.role
    });
    await user.setHashedPassword();
    user.save((err, savedUser) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(savedUser);
      }
    });
  });
}

module.exports = {
  getUser,
  register
}