import * as actionTypes from "../actions/actiontypes";

const initialState = {
  idToken: null,
  loading: false,
  error: null,
};

const authStore = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      console.log(action);
      return {
        ...state,
        idToken: action.idToken,
        loading: false,
        error: null,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default authStore;
