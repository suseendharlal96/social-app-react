import * as actionTypes from "../actions/actiontypes";

const initState = {
  loading: false,
  postloading: false,
  errors: null,
  screamData: [],
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
      console.log(action.screamData);
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
      return {
        ...state,
        errors: null,
        loading: false,
        postloading: false,
        screamData: state.screamData.concat(action.scream).reverse(),
      };

    case actionTypes.POST_SCREAM_FAIL:
      return {
        ...state,
        errors: action.error,
        loading: false,
        postloading: false,
      };

    default:
      return state;
  }
};

export default screamStore;
