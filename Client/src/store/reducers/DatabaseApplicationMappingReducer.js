import * as ACTION_TYPES from '../actions/ActionTypes';

export const initialState = {
  database_application_mappings: [],
  selected_database_application_mapping: null,
};

const DatabaseApplicationMappingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_DATABASE_APPLICATION_MAPPINGS:
      return {
        database_application_mappings: action.payload,
        selected_database: null,
      };
    case ACTION_TYPES.SET_DATABASE_APPLICATION_MAPPING:
      return {
        ...state,
        selected_database_application_mapping: action.payload,
      };
    default:
      return state;
  }
};

export default DatabaseApplicationMappingReducer;
