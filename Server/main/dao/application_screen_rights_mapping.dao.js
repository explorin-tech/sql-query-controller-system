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

module.exports.getScreenRightsMappingForAnUser = (req, res, next, params) => {
  pool.query(
    ApplicationScreenRightsMappingQuery.GET_SCREEN_RIGHTS_MAPPING_FOR_AN_USER,
    [params.user_id, params.screen_id],
    (q_err, q_res) => {
      return res.json(q_res.rows);
    }
  );
};

module.exports.addScreenRightsMappingForAnUser = (req, res, next, params) => {
  const values = params.values;
  pool.query(
    ApplicationScreenRightsMappingQuery.INSERT_SCREEN_RIGHTS_MAPPING_FOR_AN_USER,
    values,
    (q_err, q_res) => {
      return res.json(q_res.rows);
    }
  );
};

module.exports.editScreenRightsMappingForAnUser = (req, res, params) => {
  const values = params.values;
  pool.query(
    ApplicationScreenRightsMappingQuery.EDIT_SCREEN_RIGHTS_MAPPING_FOR_AN_USER,
    values,
    (q_err, q_res) => {
      return res.json(q_res.rows);
    }
  );
};

module.exports.deleteScreenRightsMappingsForAnUser = (
  req,
  res,
  next,
  params
) => {
  const user_id = params.user_id;
  pool.query(
    ApplicationScreenRightsMappingQuery.DELETE_SCREEN_RIGHTS_MAPPING_FOR_AN_USER,
    [user_id],
    (q_err, q_res) => {
      return res.json(q_res.rows);
    }
  );
};
