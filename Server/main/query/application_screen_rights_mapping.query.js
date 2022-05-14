module.exports = Object.freeze({
  GET_ALL_SCREEN_RIGHTS_MAPPING_FOR_AN_USER:
    'SELECT * FROM "ApplicationScreenRightsMapping" WHERE "ASR_U_ID" = $1',
});
