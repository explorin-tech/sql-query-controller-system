import * as ACTION_TYPES from '../actions/ActionTypes';

export const initialState = {
  screens: [],
};

const ApplicationScreenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_APPLICATION_SCREENS:
      return {
        screens: action.payload,
      };
    default:
      return state;
  }
};

export default ApplicationScreenReducer;
