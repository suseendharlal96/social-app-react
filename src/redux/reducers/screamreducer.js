import * as actionTypes from "../actions/actiontypes";

const initState = {
  loading: false,
  screamData: [],
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

    case actionTypes.LIKE_SCREAM_SUCCESS:
    case actionTypes.UNLIKE_SCREAM_SUCCESS:
      const screamIndex = state.screamData.findIndex(
        (scream) => scream.screamId === action.likeunlikeData.screamId
      );
      state.screamData[screamIndex] = action.likeunlikeData;
      return {
        ...state,
      };

    case actionTypes.DELETE_SCREAM_SUCCESS:
      return {
        ...state,
        screamData: state.screamData.filter(
          (scream) => scream.screamId !== action.deletedId
        ),
      };
      
    default:
      return state;
  }
};

export default screamStore;
