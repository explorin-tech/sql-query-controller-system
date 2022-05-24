import * as ACTION_TYPES from './ActionTypes';

export const login_success = () => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
  };
};

export const login_failure = () => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE,
  };
};

export const logout = () => {
  return {
    type: ACTION_TYPES.LOGOUT,
  };
};

export const set_db_user = (db_user) => {
  return {
    type: ACTION_TYPES.SET_DB_USER,
    payload: db_user,
  };
};

export const remove_db_user = () => {
  return {
    type: ACTION_TYPES.REMOVE_DB_USER,
  };
};

export const set_applications = (applications) => {
  return {
    type: ACTION_TYPES.SET_APPLICATIONS,
    payload: applications,
  };
};

export const set_aplication = (application) => {
  return {
    type: ACTION_TYPES.SET_APPLICATION,
    payload: application,
  };
};

export const set_all_users = (users) => {
  return {
    type: ACTION_TYPES.SET_ALL_USERS,
    payload: users,
  };
};

export const set_user = (user) => {
  return {
    type: ACTION_TYPES.SET_USER,
    payload: user,
  };
};

export const set_databases = (databases) => {
  return {
    type: ACTION_TYPES.SET_DATABASES,
    payload: databases,
  };
};

export const set_database = (database) => {
  return {
    type: ACTION_TYPES.SET_DATABASE,
    payload: database,
  };
};

export const fetch_application_screens = (screens) => {
  return {
    type: ACTION_TYPES.SET_APPLICATION_SCREENS,
    payload: screens,
  };
};

export const set_all_screen_rights_for_an_user = (screen_rights) => {
  return {
    type: ACTION_TYPES.SET_ALL_APPLICATION_SCREEN_RIGHTS,
    payload: screen_rights,
  };
};

export const set_all_screen_rights_for_selected_user = (screen_rights) => {
  return {
    type: ACTION_TYPES.SET_ALL_APPLICATION_SCREEN_RIGHTS_FOR_SELECTED_USER,
    payload: screen_rights,
  };
};

export const set_all_user_permission_rights = (user_permission_rights) => {
  return {
    type: ACTION_TYPES.SET_ALL_USER_PERMISSIONS,
    payload: user_permission_rights,
  };
};
