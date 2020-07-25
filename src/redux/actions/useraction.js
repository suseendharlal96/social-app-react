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

export const getProfile = (token) => {
  return (dispatch) => {
    dispatch(getProfileStart());
    axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
    axios
      .get("/user/profileDetails")
      .then((res) => {
        dispatch(getProfileSuccess(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        // dispatch(getProfileFail());
      });
  };
};

export const editProfile = (editData, token) => {
  return (dispatch) => {
    axios
      .post("/user/addDetails", editData)
      .then((res) => {
        dispatch(getProfile(token));
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const imageUpload = (formData, token) => {
  console.log(formData);
  return (dispatch) => {
    axios
      .post("/user/image", formData)
      .then(() => {
        dispatch(getProfile(token));
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
