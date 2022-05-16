import * as ACTION_TYPES from '../actions/ActionTypes';

export const initialState = {
  databases: [],
  selected_database: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_DATABASES:
      return {
        databases: action.payload,
        selected_database: null,
      };
    case ACTION_TYPES.SET_DATABASE:
      return {
        ...state,
        selected_database: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
