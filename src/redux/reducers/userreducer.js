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
    case actionTypes.LIKE_SCREAM_SUCCESS:
      console.log(state.userData);
      console.log(action.likeunlikeData);
      return {
        ...state,
        userData: {
          ...state.userData,
          likes: state.userData.likes.concat({
            screamId: action.likeunlikeData.screamId,
            handler: state.userData.credentials.handler,
          }),
        },
      };
    case actionTypes.UNLIKE_SCREAM_SUCCESS:
      console.log(state.userData);
      return {
        ...state,
        userData: {
          ...state.userData,
          likes: state.userData.likes.filter(
            (like) => like.screamId !== action.likeunlikeData.screamId
          ),
        },
      };
    default:
      return state;
  }
};

export default userStore;
