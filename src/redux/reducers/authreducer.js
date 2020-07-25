import * as actionTypes from "../actions/actiontypes";

const initialState = {
  idToken: null,
  loading: false,
  error: null,
};

const authStore = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
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
<<<<<<< HEAD
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        loading: false,
        error: null,
        idToken: null,
=======
    case actionTypes.LOGOUT:
      return {
        ...state,
        idToken: null,
        loading: false,
        error: null,
>>>>>>> 97648f69fee1f0ad7f5bb0ba46dbd0353a9bc81c
      };
    default:
      return state;
  }
};

export default authStore;
