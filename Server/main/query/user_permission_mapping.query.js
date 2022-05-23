module.exports = Object.freeze({
  GET_ALL_USER_PERMISSION_MAPPINGS_FOR_AN_USER:
    'SELECT * FROM "UserPermission" WHERE "UserPermission"."UP_U_ID" = $1 ORDER BY "UserPermission"."UP_AddedOn" DESC',
});
