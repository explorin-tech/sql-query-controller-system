module.exports = Object.freeze({
  GET_ALL_SCREEN_RIGHTS_MAPPING_FOR_AN_USER:
    'SELECT "ApplicationScreenRightsMapping"."ASR_AS_ID", "ApplicationScreenRightsMapping"."ASR_U_ID", "ApplicationScreen"."AS_Name", "ApplicationScreenRightsMapping"."ASR_RightToView", "ApplicationScreenRightsMapping"."ASR_RightToAdd", "ApplicationScreenRightsMapping"."ASR_RightToEdit", "ApplicationScreenRightsMapping"."ASR_RightToDelete" FROM "ApplicationScreenRightsMapping" LEFT JOIN "ApplicationScreen" ON "ApplicationScreenRightsMapping"."ASR_AS_ID" = "ApplicationScreen"."AS_ID"  WHERE "ApplicationScreenRightsMapping"."ASR_U_ID" = $1;',
  GET_SCREEN_RIGHTS_MAPPING_FOR_AN_USER:
    'SELECT * FROM "ApplicationScreenRightsMapping" WHERE "ApplicationScreenRightsMapping"."ASR_U_ID" = $1 AND "ApplicationScreenRightsMapping"."ASR_AS_ID" = $2 ',
  INSERT_SCREEN_RIGHTS_MAPPING_FOR_AN_USER:
    'INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES($1, $2, $3, $4, $5, $6, NOW(), $7, NOW(), $8) ON CONFLICT DO NOTHING',
  EDIT_SCREEN_RIGHTS_MAPPING_FOR_AN_USER:
    'UPDATE "ApplicationScreenRightsMapping" SET "ASR_RightToView" = $3, "ASR_RightToAdd" = $4, "ASR_RightToEdit" = $5, "ASR_RightToDelete" = $6, "ASR_UpdatedOn" = NOW() , "ASR_UpdatedBy" = $7 WHERE "ApplicationScreenRightsMapping"."ASR_U_ID"=$1 AND "ApplicationScreenRightsMapping"."ASR_AS_ID"=$2',
  DELETE_SCREEN_RIGHTS_MAPPING_FOR_AN_USER:
    'DELETE FROM "ApplicationScreenRightsMapping" WHERE "ApplicationScreenRightsMapping"."ASR_U_ID" = $1',
});
