module.exports = Object.freeze({
  GET_ALL_USER_PERMISSION_MAPPINGS_FOR_AN_USER:
    'SELECT * FROM "UserPermission" WHERE "UP_U_ID" = $1 ORDER BY "UP_AddedOn" DESC',
});
