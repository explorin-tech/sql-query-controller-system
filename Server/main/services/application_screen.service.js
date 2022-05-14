const { ApplicationScreenDao } = require('../dao/index');

module.exports.GET_allApplicationScreens = (req, res, next) => {
  const response = ApplicationScreenDao.getAllApplicationScreens(
    req,
    res,
    next
  );
  return response;
};
