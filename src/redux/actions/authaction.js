import * as actionTypes from "./actiontypes";

import axios from "axios";

const setLoading = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
const authSuccess = (token) => {
  console.log(token);
  axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
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
        history.push("/home");
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
