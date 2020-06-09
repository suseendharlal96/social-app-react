import * as actionTypes from "../actions/actiontypes";

const initState = {
  loading: false,
  userData: null,
};
const userStore = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_PROFILE:
      return {
        ...state,
        loading: true,
        errors: null,
      };
    case actionTypes.GET_PROFILE_SUCCESS:
      console.log(action.userData);
      return {
        ...state,
        userData: action.userData,
        loading: false,
        errors: null,
      };
    case actionTypes.GET_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default userStore;
