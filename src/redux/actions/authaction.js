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

const getProfileSuccess = (userData) => {
  return {
    type: actionTypes.GET_PROFILE_SUCCESS,
    userData: userData,
  };
};

const getProfileFail = () => {
  return {
    type: actionTypes.GET_PROFILE_FAIL,
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
        axios
          .get("/user/profileDetails")
          .then((res) => {
            dispatch(getProfileSuccess(res.data));
            history.push("/");
            console.log(res);
            console.log(res.data);
          })
          .catch((err) => {
            dispatch(getProfileFail());
            console.log(err.response.data);
          });
      })
      .catch((err) => {
        // dispatch(authFail(err.response.data));
      });
  };
};
