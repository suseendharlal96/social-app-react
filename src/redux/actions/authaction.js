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
        if (!isSignup) {
          dispatch(authSuccess(res.data));
          history.push("/");
        } else {
          dispatch(authSuccess(res.data.token));
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err && err.response && err.response.data) {
          console.log(err.response);
          console.log(err.response.data);
          dispatch(authFail(err.response.data));
        }
      });
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
