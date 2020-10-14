const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

/* GET Login page. */
router.get('/', function (req, res, next) {
  res.render('login', { error: '' });
});


router.post('/', (req, res) => {
  passport.authenticate(
    'local',
    { session: false },
    (error, user) => {

      if (error || !user) {
        res.render('login', { error: 'Invalid username or password' });
      }

      /** assigns payload to req.user */
      req.login(user, {session: false}, (error) => {
        if (error) {
          res.render('login');
        }
        const token = req.user.generateJwtToken();
        res.cookie('AuthToken', token, { maxAge: process.env.COOKIE_MAX_AGE, httpOnly: true });
        res.redirect('/position/list');
      });
    },
  )(req, res);
});

module.exports = router;
