const User = require('../models/user');


async function registerUser(req, res, next) {
  try {
    var error;
    var message;
    const username = req.body.username;
    var userData = await User.findOne({ username });
    if (userData == null) {
      const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        profilePicId: req.file.filename,
        role: req.body.role
      });
      await user.setHashedPassword();
      await User.create(user);
      message = 'Registration successful. Please go back to login.';
    } else {
      error = 'Username is already exist';
    }
    res.render('register', {
      message: message,
      error: error
    });
  } catch (err) {
    res.render('register', {
      error: 'Some error occured. Please try again later',
      message: ''
    });
  }
}

async function logout(req, res, next) {
  try{
    res.cookie('AuthToken', {expires: Date.now()});
  }
  finally{
    res.redirect('/account/login');
  }
}

module.exports = {
  registerUser,
  logout
};