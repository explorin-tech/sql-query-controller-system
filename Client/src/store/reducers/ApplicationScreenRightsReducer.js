import * as ACTION_TYPES from '../actions/ActionTypes';

export const initialState = {
  screen_rights: [],
  screen_rights_for_selected_user: [],
};

const ApplicationScreenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ALL_APPLICATION_SCREEN_RIGHTS:
      return {
        ...state,
        screen_rights: action.payload,
      };
    case ACTION_TYPES.SET_ALL_APPLICATION_SCREEN_RIGHTS_FOR_SELECTED_USER:
      return {
        ...state,
        screen_rights_for_selected_user: action.payload,
      };
    default:
      return state;
  }
};

export default ApplicationScreenReducer;
