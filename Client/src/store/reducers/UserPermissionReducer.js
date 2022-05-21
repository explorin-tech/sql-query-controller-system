import * as ACTION_TYPES from '../actions/ActionTypes';

export const initialState = {
  user_permissions: [],
};

const UserPermissionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ALL_USER_PERMISSIONS:
      return {
        user_permissions: action.payload,
      };
    default:
      return state;
  }
};

export default UserPermissionReducer;
