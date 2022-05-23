module.exports = Object.freeze({
  SELECT_ALL_DATABASE_TYPES: 'SELECT * FROM "DataBaseType"',
  SELECT_ALL_MAPPED_DATABASES:
    'SELECT * FROM "DataBaseApplicationMapping" ORDER BY "DBAM_AddedOn" DESC',
  GET_DATABASE_DETAILS:
    'SELECT * FROM "DataBaseApplicationMapping" WHERE "DBAM_ID" = $1',
  GET_APPLICATION_DATABASE_MAPPING_FOR_AN_USER:
    'SELECT "UserPermission"."UP_U_ID", "DataBaseApplicationMapping"."DBAM_MA_ID", "DataBaseApplicationMapping"."DBAM_MA_Name", "DataBaseApplicationMapping"."DBAM_DBT_ID", "DataBaseApplicationMapping"."DBAM_DBT_Name", "DataBaseApplicationMapping"."DBAM_DBName", "UserPermission"."UP_RightToRead", "UserPermission"."UP_RightToCreate", "UserPermission"."UP_RightToUpdate", "UserPermission"."UP_RightToDelete" FROM "UserPermission" LEFT JOIN "DataBaseApplicationMapping" ON"UserPermission"."UP_DBAM_ID" = "DataBaseApplicationMapping"."DBAM_ID" LEFT JOIN "User" ON"UserPermission"."UP_U_ID" = "User"."U_ID" WHERE "UserPermission"."UP_U_ID" = $1 AND "UserPermission"."UP_RightToRead" = TRUE;',
  ADD_DATABASE_MAPPING: `INSERT INTO "DataBaseApplicationMapping"("DBAM_MA_ID", "DBAM_MA_Name", "DBAM_DBName", "DBAM_DBT_ID", "DBAM_DBT_Name", "DBAM_DBConnectionString", "DBAM_DBPortNumber", "DBAM_DBHostName", "DBAM_DBUserName" ,"DBAM_DBPassword", "DBAM_AddedOn", "DBAM_AddedBy", "DBAM_UpdatedOn", "DBAM_UpdatedBy") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9 , $10, NOW(), $11, NOW(), $12) ON CONFLICT DO NOTHING`,
  EDIT_DATABASE_MAPPING: `UPDATE "DataBaseApplicationMapping" SET "DBAM_MA_ID" = $2 , "DBAM_MA_Name" = $3, "DBAM_DBName" = $4, "DBAM_DBT_ID"=$5, "DBAM_DBT_Name"=$6, "DBAM_DBConnectionString"= $7, "DBAM_DBPortNumber"=$8 , "DBAM_DBHostName"= $9, "DBAM_DBUserName"= $10 ,"DBAM_DBPassword" = $11, "DBAM_UpdatedOn"= NOW(), "DBAM_UpdatedBy"=$12 WHERE "DBAM_ID"=$1`,
  DELETE_DATABASE_MAPPING: `DELETE FROM "DataBaseApplicationMapping" WHERE "DBAM_ID" = $1`,
});
