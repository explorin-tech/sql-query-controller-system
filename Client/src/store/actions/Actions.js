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

export const remove_db_user = (db_user) => {
  return {
    type: ACTION_TYPES.REMOVE_DB_USER,
    payload: db_user,
  };
};

export const fetch_applications = (applications) => {
  return {
    type: ACTION_TYPES.FETCH_APPLICATIONS,
    payload: applications,
  };
};

export const set_aplication = (application) => {
  return {
    type: ACTION_TYPES.SET_APPLICATION,
    payload: application,
  };
};

export const fetch_all_users = (users) => {
  return {
    type: ACTION_TYPES.FETCH_ALL_USERS,
    payload: users,
  };
};

export const set_user = (user) => {
  return {
    type: ACTION_TYPES.SET_USER,
    payload: user,
  };
};

export const fetch_databases = (databases) => {
  return {
    type: ACTION_TYPES.FETCH_DATABASES,
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
    type: ACTION_TYPES.FETCH_APPLICATION_SCREENS,
    payload: screens,
  };
};

export const fetch_application_screen_rights = (screen_rights) => {
  return {
    type: ACTION_TYPES.FETCH_ALL_APPLICATION_SCREEN_RIGHTS,
    payload: screen_rights,
  };
};

export const fetch_user_permission_rights = (user_permission_rights) => {
  return {
    type: ACTION_TYPES.FETCH_ALL_USER_PERMISSIONS,
    payload: user_permission_rights,
  };
};
