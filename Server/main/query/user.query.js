module.exports = Object.freeze({
  SELECT_ALL_USERS: 'SELECT * FROM "User" ORDER BY "U_AddedOn" DESC',
  GET_USER_DETAILS: 'SELECT * FROM "User" WHERE "U_ID" = $1',
  ADD_NEW_USER: `INSERT INTO "User"("U_FirstName", "U_LastName", "U_Email", "U_Password", "U_UT_ID", "U_AddedOn", "U_AddedBy", "U_UpdatedOn", "U_UpdatedBy", "U_IsActive", "U_LastLogin", "U_IsActDrtUser" VALUES($1, $2, $3, $4, $5, NOW(), $6, NOW() ,$7, $8, NULL ,$9) ON CONFLICT DO NOTHING`,
});
