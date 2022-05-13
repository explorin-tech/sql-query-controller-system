module.exports = Object.freeze({
  SELECT_ALL_MASTER_APPLICATIONS:
    'SELECT * FROM "MasterApplication" ORDER BY "MA_AddedOn" DESC',
  GET_APPLICATION_DETAILS:
    'SELECT * FROM "MasterApplication" WHERE "MA_ID" = $1 ',
  INSERT_NEW_APPLICATION: `INSERT INTO "MasterApplication"("MA_Name", "MA_Owner1", "MA_Owner2", "MA_AddedOn", "MA_AddedBy", "MA_UpdatedOn", "MA_UpdatedBy") VALUES($1, $2, $3, NOW(), $4, NOW(), $5) ON CONFLICT DO NOTHING`,
  EDIT_AN_APPLICATION: `UPDATE "MasterApplication" SET "MA_NAME" = $2, "MA_Owner1" = $3, "MA_Owner2" = $4, "MA_UpdatedOn"=NOW(), "MA_UpdatedBy"=$5 WHERE "MA_ID"=$1`,
  DELETE_AN_APPLICATION: `DELETE FROM "MasterApplication" WHERE "MA_ID" = $1`,
});
