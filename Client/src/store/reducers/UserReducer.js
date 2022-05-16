import * as ACTION_TYPES from '../actions/ActionTypes';

export const initialState = {
  users: [],
  selected_user: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL_USERS:
      return {
        users: action.payload,
        selected_user: null,
      };
    case ACTION_TYPES.SET_USER:
      return {
        ...state,
        selected_user: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
