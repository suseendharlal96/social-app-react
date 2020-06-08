import * as actionTypes from "../actions/actiontypes";

const initialState = {
  localId: null,
  idToken: null,
  email: null,
  loading: false,
  error: null,
};

const authStore = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
        console.log(action)
      return {
        ...state,
        localId: action.localId,
        idToken: action.idToken,
        email: action.email,
        loading: false,
        error: null,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        email: null,
        error: action.error,
      };
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        email: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authStore;