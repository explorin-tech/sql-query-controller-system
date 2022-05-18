require('dotenv').config();
const jwt = require('jsonwebtoken');
const { _error } = require('./httpHelper');
const { UserDao } = require('../dao/index');
const bcrypt = require('bcryptjs');

module.exports.generateHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports.generateToken = async (userID) => {
  const token = jwt.sign({ id: userID }, process.env.JWT_CONFIG, {
    algorithm: 'HS256',
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

module.exports.validatePassword = async (
  enteredPassword,
  passwordToValidateWith
) => {
  const IsValidPassword = await bcrypt.compare(
    enteredPassword,
    passwordToValidateWith
  );
  return IsValidPassword;
};

module.exports.authValidator = async (httpRequest, httpResponse, next) => {
  if (httpRequest.headers && httpRequest.headers.token) {
    const decoded = jwt.verify(
      httpRequest.headers.token,
      process.env.JWT_CONFIG
    );
    httpRequest.headers['decoded'] = decoded;
    const userDetails = await UserDao.getUserDetails({
      user_id: decoded.UserID,
    });
    if (userDetails.length > 0) {
      return next();
    } else {
      return _error(httpResponse, {
        type: 'generic',
        message: 'User not Found',
      });
    }
  } else {
    return _error(httpResponse, {
      type: 'validation',
      message: 'Token is required',
    });
  }
};
