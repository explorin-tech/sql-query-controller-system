module.exports = Object.freeze({
  LOGIN: '/post/login',
  GET_ALL_APPLICATIONS: '/get/applications',
  GET_ALL_APPLCIATIONS_FOR_AN_USER: '/get/applications_for_an_user',
  GET_APPLICATION_DETAILS: '/get/application_details',
  ADD_AN_APPLICATION: '/post/application',
  EDIT_AN_APPLICATION: '/put/application',
  DELETE_AN_APPLICATION: '/delete/application',
  GET_ALL_DATABASES: '/get/databases',
  GET_DATABASE_DETAILS: '/get/database_details',
  ADD_DATABASE: '/post/database',
  EDIT_A_DATABASE: '/put/database',
  DELETE_A_DATABASE: '/delete/database',

  GET_ALL_DATABASE_APPLICATION_MAPPINGS: '/get/database_application_mappings',
  GET_DATABASE_APPLICATION_MAPPING_DETAILS:
    '/get/database_application_mapping_details',
  ADD_DATABASE_APPLICATION_MAPPING: '/post/database_application_mapping',
  EDIT_DATABASE_APPLICATION_MAPPING: '/edit/database_application_mapping',
  DELETE_DATABASE_APPLICATION_MAPPING: '/delete/database_application_mapping',

  GET_ALL_DATABASE_TYPES: '/get/database_types',
  GET_ALL_USERTYPES: '/get/user_types',
  GET_ALL_USERS: '/get/users',
  GET_USER_DETAILS: '/get/user_details',
  ADD_AN_USER: '/post/user',
  EDIT_USER_DETAILS: '/put/user_details',
  DELETE_AN_USER: '/delete/user',
  GET_ALL_APPLICATION_SCREENS: '/get/application_screens',
  GET_SCREEN_DETIALS: '/get/application_screen_details',
  ADD_AN_APPLICATION_SCREEN: '/post/application_screen',
  EDIT_AN_APPLICATION_SCREEN: '/put/application_screen',
  DELETE_AN_APPLICATION_SCREEN: '/delete/application_screen',
  GET_ALL_SCREEN_RIGHTS_FOR_AN_USER: '/get/screen_rights_mapping_for_an_user',
  ADD_SCREEN_RIGHTS_MAPPING_FOR_AN_USER:
    '/post/screen_rights_mapping_for_an_user',
  EDIT_SCREEN_RIGHTS_MAPPING_FOR_AN_USER:
    '/put/screen_rights_mapping_for_an_user',
  GET_ALL_USER_PERMISSION_MAPPING_FOR_AN_USER:
    '/get/user_permission_rights_mappings_for_an_user',
  EDIT_USER_PERMISSIONS_MAPPING_FOR_AN_USER:
    '/put/user_permission_rights_mappings_for_an_user',
  GET_ALL_MAPPED_DRAFT_QUERIES_FOR_USER: '/get/draft_queries_mapped_to_an_user',
  GET_ALL_MAPPED_HISTORY_QUERIES_FOR_USER:
    '/get/history_queries_mapped_to_an_user',
  GET_QUERY_DETAILS: '/get/query_details',
  POST_ADD_NEW_QUERY: '/post/query',
  EDIT_QUERY_STATUS_FOR_APPROVAL_OR_REJECTION:
    '/put/query_status_for_approval_or_rejection',
  EDIT_QUERY: '/put/query_in_set_for_approval',
  EXECUTE_QUERY: '/post/execute_query',
  GET_QUERIES_AWAITING_APPROVAL: '/get/queries_awaiting_approval',
  GET_RECENT_QUERIES: '/get/recent_queries',
});
