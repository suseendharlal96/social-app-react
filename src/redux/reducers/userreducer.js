import * as actionTypes from "../actions/actiontypes";

const initState = {
  loading: false,
  imageLoading: false,
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
        imageLoading: false,
        errors: null,
      };

    case actionTypes.GET_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.errors,
      };

    case actionTypes.PROFILE_PIC_CHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        imageLoading: true,
      };

    case actionTypes.EDIT_PROFILE_SUCCESS:
      console.log(action.editData);
      const updateduserData = { ...state.userData };
      updateduserData.credentials.bio = action.editData.bio;
      updateduserData.credentials.website = action.editData.website;
      updateduserData.credentials.location = action.editData.location;
      return {
        ...state,
        userData: updateduserData,
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

    case actionTypes.MARK_NOTIFICATIONS_READ:
      if (state.userData.notifications && state.userData.notifications.length) {
        state.userData.notifications.map((notify) => {
          notify.read = true;
        });
      }
      return {
        ...state,
      };

    case actionTypes.LOGOUT:
      let updatedUserData = { ...state.userData };
      updatedUserData = null;
      return {
        ...state,
        userData: updatedUserData,
      };
    default:
      return state;
  }
};

export default userStore;
