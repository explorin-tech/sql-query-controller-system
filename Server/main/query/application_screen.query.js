module.exports = Object.freeze({
  SELECT_ALL_APPLICATION_SCREENS:
    'SELECT * FROM "ApplicationScreen" ORDER BY "ApplicationScreen"."AS_AddedOn" DESC',
  GET_SCREEN_DETAILS:
    'SELECT * from "ApplicationScreen" WHERE "ApplicationScreen"."AS_ID" = $1',
  INSERT_NEW_APPLICATION_SCREEN: `INSERT INTO "ApplicationScreen"("AS_Name", "AS_AddedOn" , "AS_AddedBy", "AS_UpdatedOn", "AS_UpdatedBy") VALUES($1, NOW(), $2, NOW(), $3 ) ON CONFLICT DO NOTHING`,
  EDIT_SCREEN_DETAILS: `UPDATE "ApplicationScreen" SET "AS_Name" = $2, "AS_UpdatedOn"=NOW(), "AS_UpdatedBy"=$3 WHERE "AS_ID"= $1`,
  DELETE_SCREEN:
    'DELETE FROM "ApplicationScreen" WHERE "ApplicationScreen"."AS_ID" = $1',
});
