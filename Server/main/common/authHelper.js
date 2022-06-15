require('dotenv').config();
const jwt = require('jsonwebtoken');
const { _error } = require('./httpHelper');
const { UserDao } = require('../dao/index');
const bcrypt = require('bcryptjs');
const logger = require('./logger');

module.exports.generateHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports.generateToken = async (userID) => {
  const token = jwt.sign({ UserID: userID }, process.env.JWT_CONFIG_KEY, {
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
      process.env.JWT_CONFIG_KEY
    );
    httpRequest.headers['decoded'] = decoded;
    const userDetails = await UserDao.getUserDetails({
      user_id: decoded.UserID,
    });
    if (userDetails.length > 0) {
      logger.info(`POST: Auth validation`);
      return next();
    } else {
      logger.error(
        `POST: Auth validation | error : User not Found with given Token`
      );
      return _error(httpResponse, {
        type: 'generic',
        message: 'User not Found',
      });
    }
  } else {
    logger.error(`POST: Auth validation | error : Token is required`);
    return _error(httpResponse, {
      type: 'validation',
      message: 'Token is required',
    });
  }
};
