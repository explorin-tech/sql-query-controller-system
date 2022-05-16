import { combineReducers } from 'redux';

import { configureStore } from '@reduxjs/toolkit';

import ApplicationReducer from './reducers/ApplicationReducer';
import AuthReducer from './reducers/AuthReducer';
import DatabaseReducer from './reducers/DatabaseReducer';
import ApplicationScreenReducer from './reducers/ApplicationScreenReducer';
import ApplicationScreenRightsReducer from './reducers/ApplicationScreenRightsReducer';
import UserReducer from './reducers/UserReducer';
import UserPermissionReducer from './reducers/UserPermissionReducer';

const reducer = combineReducers({
  applications: ApplicationReducer,
  auth: AuthReducer,
  databases: DatabaseReducer,
  applicationScreens: ApplicationScreenReducer,
  applicationScreenRights: ApplicationScreenRightsReducer,
  users: UserReducer,
  userPermissions: UserPermissionReducer,
});

const store = configureStore({
  reducer,
});

export default store;
