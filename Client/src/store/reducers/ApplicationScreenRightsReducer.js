import * as ACTION_TYPES from '../actions/ActionTypes';

export const initialState = {
  screen_rights: [],
};

const ApplicationScreenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ALL_APPLICATION_SCREEN_RIGHTS:
      return {
        screen_rights: action.payload,
      };
    default:
      return state;
  }
};

export default ApplicationScreenReducer;
