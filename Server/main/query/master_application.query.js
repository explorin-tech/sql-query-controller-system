module.exports = Object.freeze({
  SELECT_ALL_MASTER_APPLICATIONS:
    'SELECT * FROM "MasterApplication" ORDER BY "MA_AddedOn" DESC',
  INSERT_NEW_APPLICATION: `INSERT INTO "MasterApplication"("MA_Name", "MA_Owner1", "MA_Owner2", "MA_AddedOn", "MA_AddedBy", "MA_UpdatedOn", "MA_UpdatedBy") VALUES($1, $2, $3, NOW(), $4, NOW(), $5) ON CONFLICT DO NOTHING`,
  DELETE_AN_APPLICATION: `DELETE FROM "MasterApplication" WHERE "MA_ID" = $1`,
});
