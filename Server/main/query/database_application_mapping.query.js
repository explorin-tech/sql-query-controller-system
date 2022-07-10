module.exports = Object.freeze({
  GET_ALL_DATABASE_APPLICATION_MAPPINGS:
    'SELECT * FROM "DataBaseApplicationMapping" LEFT JOIN "MasterApplication" ON "MasterApplication"."MA_ID" = "DataBaseApplicationMapping"."DBAM_MA_ID" LEFT JOIN "MasterDatabase" ON "MasterDatabase"."MD_ID" = "DataBaseApplicationMapping"."DBAM_MD_ID"  LEFT JOIN "DataBaseType" ON "DataBaseType"."DBT_ID" = "MasterDatabase"."MD_DBT_ID" ORDER BY "DataBaseApplicationMapping"."DBAM_AddedOn" DESC;',
  GET_ALL_DATABASE_APPLICATION_MAPPINGS_FOR_AN_USER:
    'SELECT "UserPermission"."UP_DBAM_ID",  "UserPermission"."UP_U_ID", "MasterDatabase"."MD_ID", "DataBaseType"."DBT_Name", "MasterDatabase"."MD_DBT_ID", "MasterDatabase"."MD_DBName", "MasterDatabase"."MD_DBHostName", "MasterDatabase"."MD_DBPortNumber", "MasterDatabase"."MD_DBConnectionString", "MasterDatabase"."MD_DBUserName", "MasterApplication"."MA_Name" ,"MasterDatabase"."MD_DBPassword", "UserPermission"."UP_RightToRead", "UserPermission"."UP_RightToCreate", "UserPermission"."UP_RightToInsert", "UserPermission"."UP_RightToUpdate", "UserPermission"."UP_RightToDelete", "UserPermission"."UP_ApprovalNotRequired" FROM "UserPermission" LEFT JOIN "DataBaseApplicationMapping" ON "UserPermission"."UP_DBAM_ID" = "DataBaseApplicationMapping"."DBAM_ID" LEFT JOIN "MasterApplication" ON "DataBaseApplicationMapping"."DBAM_MA_ID" = "MasterApplication"."MA_ID" LEFT JOIN "MasterDatabase" ON "DataBaseApplicationMapping"."DBAM_MD_ID" = "MasterDatabase"."MD_ID" LEFT JOIN "DataBaseType" ON "MasterDatabase"."MD_DBT_ID" = "DataBaseType"."DBT_ID" LEFT JOIN "User" ON "UserPermission"."UP_U_ID" = "User"."U_ID" WHERE "UserPermission"."UP_U_ID" = $1 AND "UserPermission"."UP_RightToRead" = TRUE;',
  GET_DATABASE_APPLICATION_MAPPING_DETAILS:
    'SELECT * FROM "DataBaseApplicationMapping" LEFT JOIN "MasterApplication" ON "MasterApplication"."MA_ID" = "DataBaseApplicationMapping"."DBAM_MA_ID" LEFT JOIN "MasterDatabase" ON "MasterDatabase"."MD_ID" = "DataBaseApplicationMapping"."DBAM_MD_ID" WHERE "DataBaseApplicationMapping"."DBAM_ID" = $1;',
  INSERT_NEW_DATABASE_APPLICATION_MAPPING:
    'INSERT INTO "DataBaseApplicationMapping"("DBAM_MA_ID", "DBAM_MD_ID", "DBAM_AddedOn", "DBAM_AddedBy", "DBAM_UpdatedOn", "DBAM_UpdatedBy") VALUES ($1, $2, NOW(), $3, NOW(), $3) RETURNING "DBAM_ID";',
  EDIT_DATABASE_APPLICATION_MAPPING:
    'UPDATE "DataBaseApplicationMapping" SET "DBAM_MA_ID" = $2, "DBAM_MD_ID" = $3, "DBAM_UpdatedOn" = NOW(), "DBAM_UpdatedBy" = $4 WHERE "DataBaseApplicationMapping"."DBAM_ID" = $1;',
  DELETE_DATABASE_APPLICATION_MAPPING:
    'DELETE FROM "DataBaseApplicationMapping" WHERE "DataBaseApplicationMapping"."DBAM_ID" = $1',
});
