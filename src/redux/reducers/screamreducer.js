import * as actionTypes from "../actions/actiontypes";

const initState = {
  loading: false,
  postloading: false,
  individualLoading: false,
  errors: null,
  screamData: [],
  singleScream: [],
};
const screamStore = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_SCREAM:
      return {
        ...state,
        loading: true,
        postloading: false,
        errors: null,
      };

    case actionTypes.GET_SCREAM_SUCCESS:
      return {
        ...state,
        screamData: action.screamData.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
        loading: false,
        postloading: false,
        errors: null,
      };

    case actionTypes.GET_SCREAM_FAIL:
      return {
        ...state,
        loading: false,
        postloading: false,
        errors: action.errors,
      };

    case actionTypes.LIKE_SCREAM_SUCCESS:
    case actionTypes.UNLIKE_SCREAM_SUCCESS:
      const screamIndex = state.screamData.findIndex(
        (scream) => scream.screamId === action.likeunlikeData.screamId
      );
      state.screamData[screamIndex] = action.likeunlikeData;
      return {
        ...state,
        errors: null,
        postloading: false,
      };

    case actionTypes.DELETE_SCREAM_SUCCESS:
      return {
        ...state,
        errors: null,
        postloading: false,
        screamData: state.screamData.filter(
          (scream) => scream.screamId !== action.deletedId
        ),
      };

    case actionTypes.POST_SCREAM_START:
      return {
        ...state,
        errors: null,
        loading: false,
        postloading: true,
      };

    case actionTypes.POST_SCREAM_SUCCESS:
      let updatedScreamsData = [...state.screamData];
      console.log("sd", updatedScreamsData);
      updatedScreamsData = updatedScreamsData.concat(action.scream);
      updatedScreamsData.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      console.log(updatedScreamsData);
      return {
        ...state,
        errors: null,
        loading: false,
        postloading: false,
        screamData: updatedScreamsData,
      };

    case actionTypes.POST_SCREAM_FAIL:
      return {
        ...state,
        errors: action.error,
        loading: false,
        postloading: false,
      };

    case actionTypes.GET_INDIVIDUAL_SCREAM:
      return {
        ...state,
        loading: false,
        errors: null,
        individualLoading: true,
        postloading: false,
      };

    case actionTypes.GET_INDIVIDUAL_SCREAM_SUCCESS:
      return {
        ...state,
        individualLoading: false,
        singleScream: state.singleScream.concat(action.scream),
      };

    case actionTypes.POST_COMMENT_SUCCESS:
      // for updating comment count in main display
      const index = state.screamData.findIndex(
        (scream) => scream.screamId === action.screamId
      );
      const updatedScreamData = JSON.parse(JSON.stringify(state.screamData));
      updatedScreamData[index].commentCount += 1;

      // for updating comments & count inside scream details display
      const scindex = state.singleScream.findIndex(
        (scream) => scream.screamId === action.screamId
      );
      const updatedSingleScream = JSON.parse(
        JSON.stringify(state.singleScream)
      );
      updatedSingleScream[scindex].comments.unshift(action.commentData);
      return {
        ...state,
        screamData: updatedScreamData,
        singleScream: updatedSingleScream,
      };

    case actionTypes.POST_COMMENT_FAIL:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default screamStore;
