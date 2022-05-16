module.exports = Object.freeze({
  SELECT_ALL_MASTER_APPLICATIONS:
    'SELECT * FROM "MasterApplication" ORDER BY "MA_AddedOn" DESC;',
  SELECT_ALL_MASTER_APPLICATIONS_FOR_AN_USER:
    'SELECT "UserPermission"."UP_U_ID", "DataBaseApplicationMapping"."DBAM_MA_ID", "DataBaseApplicationMapping"."DBAM_MA_Name", "DataBaseApplicationMapping"."DBAM_DBT_ID", "DataBaseApplicationMapping"."DBAM_DBT_Name", "DataBaseApplicationMapping"."DBAM_DBName", "UserPermission"."UP_RightToRead", "UserPermission"."UP_RightToCreate", "UserPermission"."UP_RightToUpdate", "UserPermission"."UP_RightToDelete" FROM "UserPermission" LEFT JOIN "DataBaseApplicationMapping" ON"UserPermission"."UP_DBAM_ID" = "DataBaseApplicationMapping"."DBAM_ID" LEFT JOIN "User" ON"UserPermission"."UP_U_ID" = "User"."U_ID" WHERE "UserPermission"."UP_U_ID" = $1 AND "UserPermission"."UP_RightToRead" = TRUE;',
  GET_APPLICATION_DETAILS:
    'SELECT * FROM "MasterApplication" WHERE "MA_ID" = $1;',
  INSERT_NEW_APPLICATION: `INSERT INTO "MasterApplication"("MA_Name", "MA_Owner1", "MA_Owner2", "MA_AddedOn", "MA_AddedBy", "MA_UpdatedOn", "MA_UpdatedBy") VALUES($1, $2, $3, NOW(), $4, NOW(), $5) ON CONFLICT DO NOTHING;`,
  EDIT_AN_APPLICATION: `UPDATE "MasterApplication" SET "MA_NAME" = $2, "MA_Owner1" = $3, "MA_Owner2" = $4, "MA_UpdatedOn"=NOW(), "MA_UpdatedBy"=$5 WHERE "MA_ID"=$1;`,
  DELETE_AN_APPLICATION: `DELETE FROM "MasterApplication" WHERE "MA_ID" = $1;`,
});
