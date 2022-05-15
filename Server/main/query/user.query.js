module.exports = Object.freeze({
  SELECT_ALL_USER_TYPES: 'SELECT * FROM "UserType"',
  SELECT_ALL_USERS: 'SELECT * FROM "User" ORDER BY "U_AddedOn" DESC',
  GET_USER_DETAILS: 'SELECT * FROM "User" WHERE "U_ID" = $1',
  ADD_NEW_USER: `INSERT INTO "User"("U_FirstName", "U_LastName", "U_Email", "U_Password", "U_UT_ID", "U_AddedOn", "U_AddedBy", "U_UpdatedOn", "U_UpdatedBy", "U_IsActive", "U_IsActDrtUser") VALUES($1, $2, $3, $4, $5, NOW(), $6, NOW() ,$7, $8 ,$9) ON CONFLICT DO NOTHING`,
  EDIT_USER_DETAILS:
    'UPDATE "User" SET "U_FirstName" = $2 , "U_LastName" = $3 , "U_Email" = $4, "U_Password" = $5, "U_UT_ID" = $6, "U_UpdatedOn" = NOW(), "U_UpdatedBy" = $7, "U_IsActive" = $8, "U_IsActDrtUser" = $9 WHERE "U_ID" = $1',
  DELETE_USER: 'DELETE FROM "User" WHERE "U_ID" = $1',
});
