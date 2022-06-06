module.exports = Object.freeze({
  GET_ALL_MAPPED_DRAFT_QUERIES_FOR_ADMIN:
    'SELECT * FROM "Query" WHERE "Query"."Q_IsDrafted" = TRUE ORDER BY "Query"."Q_CreatedOn" DESC LIMIT 10 OFFSET $1;',
  GET_ALL_MAPPED_HISTORY_DRAFT_QUERIES_FOR_ADMIN:
    'SELECT * FROM "Query" WHERE "Query"."Q_IsMovedToHistory" = TRUE ORDER BY "Query"."Q_CreatedOn" DESC LIMIT 10 OFFSET $1;',
  GET_ALL_MAPPED_DRAFT_QUERIES_FOR_DEV:
    'SELECT * FROM "Query" WHERE "Query"."Q_CreatedBy" = $1 AND "Query"."Q_IsDrafted" = TRUE ORDER BY "Query"."Q_CreatedOn" DESC LIMIT 10 OFFSET $2;',
  GET_ALL_MAPPED_HISTORY_QUERIES_FOR_DEV:
    'SELECT * FROM "Query" WHERE "Query"."Q_CreatedBy" = $1 AND "Query"."Q_IsMovedToHistory" = TRUE ORDER BY "Query"."Q_CreatedOn" DESC LIMIT 10 OFFSET $2;',
  GET_ALL_MAPPED_DRAFT_QUERIES_FOR_APPLICATION_OWNER:
    'SELECT DISTINCT * FROM "Query" WHERE "Query"."Q_IsDrafted" = TRUE AND "Query"."Q_CreatedBy" = $1 OR "Query"."Q_DBAM_ID" IN (SELECT "DataBaseApplicationMapping"."DBAM_ID" FROM "MasterApplication" LEFT JOIN "DataBaseApplicationMapping" ON "MasterApplication"."MA_ID" = "DataBaseApplicationMapping"."DBAM_MA_ID" WHERE "MasterApplication"."MA_Owner1" = $1 OR "MasterApplication"."MA_Owner2" = $1) AND "Query"."Q_IsDrafted" = TRUE ORDER BY "Query"."Q_CreatedOn" DESC LIMIT 10 OFFSET $2;',
  GET_ALL_MAPPED_HISTORY_QUERIES_FOR_APPLICATION_OWNER:
    'SELECT DISTINCT * FROM "Query" WHERE "Query"."Q_IsMovedToHistory" = TRUE AND "Query"."Q_CreatedBy" = $1 OR "Query"."Q_DBAM_ID" IN (SELECT "DataBaseApplicationMapping"."DBAM_ID" FROM "MasterApplication" LEFT JOIN "DataBaseApplicationMapping" ON "MasterApplication"."MA_ID" = "DataBaseApplicationMapping"."DBAM_MA_ID" WHERE "MasterApplication"."MA_Owner1" = $1 OR "MasterApplication"."MA_Owner2" = $1) AND "Query"."Q_IsMovedToHistory" = TRUE ORDER BY "Query"."Q_CreatedOn" DESC LIMIT 10 OFFSET $2;',
  POST_ADD_NEW_QUERY: `INSERT INTO "Query"("Q_DBAM_ID", "Q_QS_ID", "Q_SysDefName", "Q_UserDefName", "Q_RawQuery", "Q_QueryDesc", "Q_CreatedOn", "Q_CreatedBy", "Q_UpdatedOn", "Q_UpdatedBy", "Q_IsDrafted", "Q_IsMovedToHistory", "Q_Comments") VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7, NOW(), $8, TRUE, FALSE, $9);`,
  EDIT_QUERY_DETAILS: `UPDATE "Query" SET "Q_UserDefName" = $2, "Q_QueryDesc"= $3, "Q_UpdatedOn" = NOW(), "Q_UpdatedBy" = $4, "Q_Comments" = $5 WHERE "Query"."Q_ID" = $1;`,
  EDIT_QUERY_STATUS_FOR_APPROVAL: `UPDATE "Query" SET "Q_QS_ID" = $2, "Q_ApprovedBy" = $3, "Q_ApprovedOn" = NOW(), "Q_UpdatedOn" = NOW(), "Q_UpdatedBy" = $4, "Q_IsDrafted" = FALSE, "Q_IsMovedToHistory" = TRUE WHERE "Query"."Q_ID" = $1;`,
  EDIT_QUERY_STATUS_FOR_REJECTION: `UPDATE "Query" SET "Q_QS_ID" = $2, "Q_UpdatedOn" = NOW(),  "Q_UpdatedBy" = $3, "Q_IsDrafted" = FALSE, "Q_IsMovedToHistory" = TRUE WHERE "Query"."Q_ID" = $1;`,
});
