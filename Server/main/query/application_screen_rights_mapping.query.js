module.exports = Object.freeze({
  GET_ALL_SCREEN_RIGHTS_MAPPING_FOR_AN_USER:
    'SELECT * FROM "ApplicationScreenRightsMapping" WHERE "ASR_U_ID" = $1',
  INSERT_SCREEN_RIGHTS_MAPPING_FOR_AN_USER:
    'INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES($1, $2, $3, $4, $5, $6, NOW(), $7, NOW(), $8) ON CONFLICT DO NOTHING',
});
