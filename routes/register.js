const express = require('express');
const router = express.Router();
const storage = require('../config/storage');

const { registerUser } = require("../controllers/account");

/* GET register page. */
router.get('/', function (req, res, next) {
  res.render('register', { error: '', message: '' });
});

/** Register user */
router.post('/', storage.upload.single('image'), registerUser);

module.exports = router;
