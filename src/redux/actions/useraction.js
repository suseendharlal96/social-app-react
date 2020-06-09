import axios from "axios";

import * as actionTypes from "./actiontypes";

const getProfileStart = () => {
  return {
    type: actionTypes.GET_PROFILE,
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

export const getProfile = () => {
  return (dispatch) => {
    dispatch(getProfileStart());
    axios
      .get("/user/profileDetails")
      .then((res) => {
        dispatch(getProfileSuccess(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch(getProfileFail());
      });
  };
};

export const imageUpload = (formData) => {
  console.log(formData);
  return (dispatch) => {
    axios
      .post("/user/image", formData)
      .then(() => {
        dispatch(getProfile());
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
