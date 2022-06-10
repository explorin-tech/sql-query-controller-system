module.exports = Object.freeze({
  GET_ALL_USER_PERMISSION_MAPPINGS_FOR_AN_USER:
    'SELECT * FROM "UserPermission" LEFT JOIN "DataBaseApplicationMapping" ON "DataBaseApplicationMapping"."DBAM_ID" = "UserPermission"."UP_DBAM_ID"  LEFT JOIN "MasterApplication" ON "DataBaseApplicationMapping"."DBAM_MA_ID" = "MasterApplication"."MA_ID" LEFT JOIN "DataBaseType" ON "DataBaseType"."DBT_ID" = "DBAM_DBT_ID" WHERE "UserPermission"."UP_U_ID" = $1 ORDER BY "UserPermission"."UP_AddedOn" DESC;',
  GET_ALL_USER_PERMISSION_MAPPINGS_FOR_A_USER_ACCORDING_TO_ACCESS_RIGHTS:
    'SELECT * FROM "UserPermission" LEFT JOIN "DataBaseApplicationMapping" ON "DataBaseApplicationMapping"."DBAM_ID" = "UserPermission"."UP_DBAM_ID"  LEFT JOIN "MasterApplication" ON "DataBaseApplicationMapping"."DBAM_MA_ID" = "MasterApplication"."MA_ID" LEFT JOIN "DataBaseType" ON "DataBaseType"."DBT_ID" = "DBAM_DBT_ID" WHERE "UserPermission"."UP_U_ID" = $1 AND "UserPermission"."UP_DBAM_ID" IN (SELECT DISTINCT "UserPermission"."UP_DBAM_ID" FROM "UserPermission" WHERE "UserPermission"."UP_U_ID" = $2 AND "UserPermission"."UP_RightToRead" = TRUE) ORDER BY "UserPermission"."UP_AddedOn" DESC;',
  INSERT_USER_PERMISSION_RIGHTS_MAPPINGS_FOR_AN_USER:
    'INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToInsert", "UP_RightToUpdate", "UP_RightToDelete", "UP_ApprovalNotRequired", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), $9, NOW(), $10);',
  UPDATE_USER_PERMISSION_RIGHTS_MAPPINGS_FOR_AN_USER:
    'UPDATE "UserPermission" SET "UP_RightToRead" = $3, "UP_RightToCreate" = $4, "UP_RightToInsert" = $5, "UP_RightToUpdate" = $6, "UP_RightToDelete" = $7, "UP_ApprovalNotRequired" = $8, "UP_UpdatedOn" = NOW() , "UP_UpdatedBy" = $9 WHERE "UserPermission"."UP_U_ID"=$1 AND "UserPermission"."UP_DBAM_ID"=$2;',
});
