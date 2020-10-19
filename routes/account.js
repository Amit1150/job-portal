const express = require('express');
const passport = require('passport');
const router = express.Router();
const storage = require('../config/storage');
const enums = require('../utils/enums');


const { 
  registerUser,
  logout
 } = require("../controllers/account");

/* GET register page. */
router.get('/register', function (req, res, next) {
  res.render('register', { error: '', message: '' });
});

/** Register user */
router.post('/register', storage.upload.single('image'), registerUser);

/** Logout */
router.post('/logout', logout);

/* GET Login page. */
router.get('/login', function (req, res, next) {
  res.render('login', { error: '' });
});

/** Login request */
router.post('/login', (req, res) => {
  passport.authenticate(
    'local',
    { session: false },
    (error, user) => {

      if (error || !user) {
        res.render('login', { error: 'Invalid username or password' });
      } else {
        /** assigns payload to req.user */
        req.login(user, { session: false }, (error) => {
          if (error) {
            res.render('login');
          }
          const token = req.user.generateJwtToken();
          res.cookie('AuthToken', token, { maxAge: process.env.COOKIE_MAX_AGE, httpOnly: true });
          if (req.user.role == enums.roles.ProjectManager) {
            res.redirect('/manager/positions');
          } else {
            res.redirect('/positions');
          }
        });
      }
    },
  )(req, res);
});

module.exports = router;
