import axios from "axios";

import * as actionType from "./actiontypes";
const screamStart = () => {
  return {
    type: actionType.GET_SCREAM,
  };
};
const screamSuccess = (data) => {
  return {
    type: actionType.GET_SCREAM_SUCCESS,
    screamData: data,
  };
};
const screamFail = (error) => {
  return {
    type: actionType.GET_SCREAM_FAIL,
    error: error,
  };
};

export const getScreams = () => {
  return (dispatch) => {
    dispatch(screamStart());
    axios
      .get("/screams")
      .then((res) => {
        console.log(res.data);
        dispatch(screamSuccess(res.data));
      })
      .catch((err) => {
        dispatch(screamFail(err));
        console.log(err);
      });
  };
};
