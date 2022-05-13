module.exports = Object.freeze({
  SELECT_ALL_MAPPED_DATABASES:
    'SELECT * FROM "DataBaseApplicationMapping" ORDER BY "DBAM_AddedOn" DESC',
  ADD_DATABASE_MAPPING: `INSERT INTO "DataBaseApplicationMapping"("DBAM_MA_ID", "DBAM_MA_Name", "DBAM_DBName", "DMAM_DBT_ID", "DMAM_DBT_Name", "DBAM_DBConnectionString", "DBAM_DBPortNumber", "DBAM_DBHostName", "DBAM_DBPassword", "DBAM_AddedOn", "DBAM_AddedBy", "DBAM_UpdatedOn", "DBAM_UpdatedBy") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), $10, NOW(), $11) ON CONFLICT DO NOTHING`,
});
