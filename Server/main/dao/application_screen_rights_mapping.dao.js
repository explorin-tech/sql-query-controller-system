const pool = require('../db/index');
const { ApplicationScreenRightsMappingQuery } = require('../query');

module.exports.getAllScreenRightsMappingForAnUser = (
  req,
  res,
  next,
  params
) => {
  const user_id = params.user_id;
  pool.query(
    ApplicationScreenRightsMappingQuery.GET_ALL_SCREEN_RIGHTS_MAPPING_FOR_AN_USER,
    [user_id],
    (q_err, q_res) => {
      return res.json(q_res.rows);
    }
  );
};
