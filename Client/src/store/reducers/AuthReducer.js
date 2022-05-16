import * as ACTION_TYPES from '../actions/ActionTypes';

export const initialState = {
  is_authenticated: false,
  user: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        is_authenticated: true,
      };
    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        is_authenticated: false,
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        is_authenticated: false,
        user: null,
      };

    case ACTION_TYPES.SET_DB_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ACTION_TYPES.REMOVE_DB_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
