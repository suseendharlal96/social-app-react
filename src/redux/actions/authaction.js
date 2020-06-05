import * as actionTypes from "./actiontypes";

import axios from "axios";

const setLoading = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
const authSuccess = (data) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: data.idToken,
    localId: data.localId,
  };
};
const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authStart = (isSignup, authData, history) => {
  return (dispatch) => {
    dispatch(setLoading());
    let url = "/signin";
    if (isSignup) {
      url = "/signup";
    }
    axios
      .post(url, authData)
      .then((res) => {
        dispatch(authSuccess(res.data));
        history.push("/");
      })
      .catch((err) => {
        dispatch(authFail(err.response.data));
      });
  };
};
