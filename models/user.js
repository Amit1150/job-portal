const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const jwtSecret = process.env.Jwt_SECRET;
const saltRounds = process.env.SALT_ROUNDS || 10;

const UserSchema = new Schema({
  name: String,
  username: String,
  password: String,
  role: String,
  profilePicId: String,
});

UserSchema.methods.setHashedPassword = async function () {
  const hashedPassword = await bcrypt.hash(this.password, parseInt(saltRounds));
  this.password = hashedPassword;
};

UserSchema.methods.validatePassword = async function (password) {
  try {
    const pwdMatches = await bcrypt.compare(password, this.password);
    return pwdMatches;
  } catch (error) {
    console.log(error);
    return false;
  }
};

UserSchema.methods.generateJwtToken = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 1);
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      name: this.name,
      profilePicId: this.profilePicId,
      role: this.role,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    jwtSecret
  );
};

UserSchema.methods.toAuthJson = function () {
  return {
    username: this.username,
    _id: this._id,
    token: this.generateJwtToken(),
  };
};

module.exports = mongoose.model('User', UserSchema);
