const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const storage = require('../config/storage');
const userService = require('../services/user');

/* GET register page. */
router.get('/', function (req, res, next) {
  res.render('register', { error: '', message: '' });
});

router.post('/', storage.upload.single('image'), async function (req, res, next) {
  var error = '';
  try {
    const userData = await userService.getUser(req.body.username);
    if (userData == null) {
      var savedUser = await userService.register(req);
      res.render('register', {
        message: 'Registration successful. Please go back to login.',
        error: ''
      });
    } else {
      error = 'Username is already exist.';
    }
  } catch (error) {
    error = 'Some error occured. Please try again later'
  }
  if(error) {
    res.render('register', {
      error: error,
      message: ''
    });
  }
});

module.exports = router;
