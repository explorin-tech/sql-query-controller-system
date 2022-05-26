module.exports = Object.freeze({
  SELECT_ALL_DATABASE_TYPES: 'SELECT * FROM "DataBaseType"',
  SELECT_ALL_MAPPED_DATABASES:
    'SELECT * FROM "DataBaseApplicationMapping" LEFT JOIN "MasterApplication" ON "MasterApplication"."MA_ID" = "DataBaseApplicationMapping"."DBAM_MA_ID" LEFT JOIN "DataBaseType" ON "DataBaseType"."DBT_ID" = "DataBaseApplicationMapping"."DBAM_DBT_ID"  ORDER BY "DataBaseApplicationMapping"."DBAM_AddedOn" DESC;',
  GET_DATABASE_DETAILS:
    'SELECT * FROM "DataBaseApplicationMapping" WHERE "DataBaseApplicationMapping"."DBAM_ID" = $1',
  GET_APPLICATION_DATABASE_MAPPING_FOR_AN_USER:
    'SELECT "UserPermission"."UP_U_ID", "DataBaseApplicationMapping"."DBAM_ID", "DataBaseApplicationMapping"."DBAM_MA_ID", "DataBaseApplicationMapping"."DBAM_DBT_ID", "DataBaseApplicationMapping"."DBAM_DBName", "UserPermission"."UP_RightToRead", "UserPermission"."UP_RightToCreate", "UserPermission"."UP_RightToUpdate", "UserPermission"."UP_RightToDelete" FROM "UserPermission" LEFT JOIN "DataBaseApplicationMapping" ON "UserPermission"."UP_DBAM_ID" = "DataBaseApplicationMapping"."DBAM_ID" LEFT JOIN "User" ON "UserPermission"."UP_U_ID" = "User"."U_ID" WHERE "UserPermission"."UP_U_ID" = $1 AND "UserPermission"."UP_RightToRead" = TRUE;',
  ADD_DATABASE_MAPPING: `INSERT INTO "DataBaseApplicationMapping"("DBAM_MA_ID", "DBAM_DBName", "DBAM_DBT_ID",  "DBAM_DBConnectionString", "DBAM_DBPortNumber", "DBAM_DBHostName", "DBAM_DBUserName" ,"DBAM_DBPassword", "DBAM_AddedOn", "DBAM_AddedBy", "DBAM_UpdatedOn", "DBAM_UpdatedBy") VALUES($1, $2, $3, $4, $5, $6, $7, $8, NOW(), $9, NOW(), $10) ON CONFLICT DO NOTHING;`,
  EDIT_DATABASE_MAPPING: `UPDATE "DataBaseApplicationMapping" SET "DBAM_MA_ID" = $2 , "DBAM_DBName" = $3, "DBAM_DBT_ID"=$4, "DBAM_DBConnectionString"= $5, "DBAM_DBPortNumber"=$6 , "DBAM_DBHostName"= $7, "DBAM_DBUserName"= $8 , "DBAM_DBPassword" = $9, "DBAM_UpdatedOn"= NOW(), "DBAM_UpdatedBy"=$10 WHERE "DataBaseApplicationMapping"."DBAM_ID"=$1;`,
  DELETE_DATABASE_MAPPING: `DELETE FROM "DataBaseApplicationMapping" WHERE "DataBaseApplicationMapping"."DBAM_ID" = $1`,
});
