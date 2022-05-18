const { UserDao } = require('../dao/index');
const { _200, _error } = require('../common/httpHelper');
const { validatePassword, generateToken } = require('../common/authHelper');

module.exports.POST_loginUser = async (httpRequest, httpResponse, next) => {
  try {
    const email = httpRequest.body.user.email;
    const userDetails = await UserDao.getUserDetailsForEmail({ email: email });
    if (userDetails.length == 0) {
      return _error(httpResponse, {
        type: 'validation',
        message:
          'User with this email does not exist, Please enter a valid email.',
      });
    }
    const IsValidPassword = await validatePassword(
      httpRequest.body.user.password,
      userDetails[0]['U_Password']
    );
    if (!IsValidPassword) {
      return _error(httpResponse, {
        type: 'validation',
        message: 'Invalid Password, Please try again.',
      });
    }
    const tokenGenerated = await generateToken(userDetails[0]['U_ID']);
    return _200(httpResponse, tokenGenerated);
  } catch (err) {
    return _error(httpResponse, {
      type: 'validation',
      message: err,
    });
  }
};
