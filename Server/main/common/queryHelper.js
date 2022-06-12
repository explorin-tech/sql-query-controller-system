module.exports.identifyQueryType = (rawQuery) => {
  const wordInString = (s, word) =>
    new RegExp('\\b' + word + '\\b', 'i').test(s);
  if (wordInString(rawQuery, 'SELECT')) {
    return 'SELECT';
  } else if (wordInString(rawQuery, 'CREATE')) {
    return 'CREATE';
  } else if (wordInString(rawQuery, 'INSERT')) {
    return 'INSERT';
  } else if (wordInString(rawQuery, 'UPDATE')) {
    return 'UPDATE';
  } else if (wordInString(rawQuery, 'DELETE')) {
    return 'DELETE';
  }
  return undefined;
};

module.exports.checkQueryExecutionRight = (
  query_type,
  user_permission_array_for_selected_database_mapping
) => {
  if (query_type === 'SELECT') {
    if (user_permission_array_for_selected_database_mapping['UP_RightToRead']) {
      return true;
    }
  } else if (query_type === 'CREATE') {
    if (
      user_permission_array_for_selected_database_mapping['UP_RightToCreate']
    ) {
      return true;
    }
  } else if (query_type === 'INSERT') {
    if (
      user_permission_array_for_selected_database_mapping['UP_RightToInsert']
    ) {
      return true;
    }
  } else if (query_type === 'UPDATE') {
    if (
      user_permission_array_for_selected_database_mapping['UP_RightToUpdate']
    ) {
      return true;
    }
  } else if (query_type === 'DELETE') {
    if (
      user_permission_array_for_selected_database_mapping['UP_RightToDelete']
    ) {
      return true;
    }
  }
  return false;
};
