import * as actionTypes from "../actions/actiontypes";

const initState = {
  loading: false,
  screamData: null,
};
const screamStore = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_SCREAM:
      return {
        ...state,
        loading: true,
        errors: null,
      };
    case actionTypes.GET_SCREAM_SUCCESS:
      console.log(action.screamData);
      return {
        ...state,
        screamData: action.screamData,
        loading: false,
        errors: null,
      };
    case actionTypes.GET_SCREAM_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default screamStore;
