import * as ACTION_TYPES from '../actions/ActionTypes';

export const initialState = {
  user_permissions: [],
  user_permissions_for_selected_user: [],
};

const UserPermissionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ALL_USER_PERMISSIONS:
      return {
        ...state,
        user_permissions: action.payload,
      };
    case ACTION_TYPES.SET_ALL_USER_PERMISSIONS_FOR_SELECTED_USER:
      return {
        ...state,
        user_permissions_for_selected_user: action.payload,
      };
    default:
      return state;
  }
};

export default UserPermissionReducer;
