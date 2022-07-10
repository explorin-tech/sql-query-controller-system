module.exports = Object.freeze({
  SELECT_ALL_DATABASE_TYPES: 'SELECT * FROM "DataBaseType";',
  SELECT_ALL_MAPPED_DATABASES:
    'SELECT * FROM "MasterDatabase" LEFT JOIN "DataBaseType" ON "DataBaseType"."DBT_ID" = "MasterDatabase"."MD_DBT_ID" ORDER BY "MasterDatabase"."MD_AddedOn" DESC;',
  GET_DATABASE_DETAILS:
    'SELECT * FROM "MasterDatabase" LEFT JOIN "DataBaseType" ON "DataBaseType"."DBT_ID" = "MasterDatabase"."MD_DBT_ID" WHERE "MasterDatabase"."MD_ID" = $1',
  ADD_DATABASE: `INSERT INTO "MasterDatabase"("MD_DBName", "MD_DBT_ID",  "MD_DBConnectionString", "MD_DBPortNumber", "MD_DBHostName", "MD_DBUserName" ,"MD_DBPassword", "MD_AddedOn", "MD_AddedBy", "MD_UpdatedOn", "MD_UpdatedBy") VALUES($1, $2, $3, $4, $5, $6, $7, NOW(), $8, NOW(), $9) RETURNING "MD_ID";`,
  EDIT_DATABASE: `UPDATE "MasterDatabase" SET "MD_DBName" = $2, "MD_DBT_ID"=$3, "MD_DBConnectionString"= $4, "MD_DBPortNumber"=$5 , "MD_DBHostName"= $6, "MD_DBUserName"= $7 , "MD_DBPassword" = $8, "MD_UpdatedOn"= NOW(), "MD_UpdatedBy"=$9 WHERE "MasterDatabase"."MD_ID"=$1;`,
  DELETE_DATABASE: `DELETE FROM "MasterDatabase" WHERE "MasterDatabase"."MD_ID" = $1`,
});
