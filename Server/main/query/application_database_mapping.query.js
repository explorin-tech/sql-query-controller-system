module.exports = Object.freeze({
  SELECT_ALL_DATABASE_TYPES: 'SELECT * FROM "DataBaseType"',
  SELECT_ALL_MAPPED_DATABASES:
    'SELECT * FROM "DataBaseApplicationMapping" ORDER BY "DBAM_AddedOn" DESC',
  ADD_DATABASE_MAPPING: `INSERT INTO "DataBaseApplicationMapping"("DBAM_MA_ID", "DBAM_MA_Name", "DBAM_DBName", "DMAM_DBT_ID", "DMAM_DBT_Name", "DBAM_DBConnectionString", "DBAM_DBPortNumber", "DBAM_DBHostName", "DBAM_DBPassword", "DBAM_AddedOn", "DBAM_AddedBy", "DBAM_UpdatedOn", "DBAM_UpdatedBy") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), $10, NOW(), $11) ON CONFLICT DO NOTHING`,
  EDIT_DATABASE_MAPPING: `UPDATE "DataBaseApplicationMapping" SET "DBAM_MA_ID" = $2 , "DBAM_MA_Name" = $3, "DBAM_DBName" = $4, "DMAM_DBT_ID"=$5, "DMAM_DBT_Name"=$6, "DBAM_DBConnectionString"= $7, "DBAM_DBPortNumber"=$8 , "DBAM_DBHostName"= $9, "DBAM_DBPassword" = $10, "DBAM_UpdatedOn"= NOW(), "DBAM_UpdatedBy"=$11 WHERE "DBAM_ID"=$1`,
  DELETE_DATABASE_MAPPING: `DELETE FROM "DataBaseApplicationMapping" WHERE "DBAM_ID" = $1`,
});
