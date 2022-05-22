import * as ACTION_TYPES from '../actions/ActionTypes';

export const initialState = {
  applications: [],
  selected_aplication: null,
};

const ApplicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_APPLICATIONS:
      return {
        applications: action.payload,
        selected_aplication: null,
      };
    case ACTION_TYPES.SET_APPLICATION:
      return {
        ...state,
        selected_aplication: action.payload,
      };
    default:
      return state;
  }
};

export default ApplicationReducer;
