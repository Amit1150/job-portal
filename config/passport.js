const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne(
      {
        username,
      },
      async (err, user) => {
        if (err) {
          return done(err);
        }
        else if (!user || !(await user.validatePassword(password))) {
          return done(null, false);
        }else {
          return done(null, user);
        }
      }
    );
  })
);
