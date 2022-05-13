module.exports = Object.freeze({
  SELECT_ALL_USERS: 'SELECT * FROM "User" ORDER BY "U_AddedOn" DESC',
  GET_USER_DETAILS: 'SELECT * FROM "User" WHERE "U_ID" = $1',
});
