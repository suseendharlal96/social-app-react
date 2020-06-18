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

const markNotificationReadSuccess = () => {
  return {
    type: actionTypes.MARK_NOTIFICATIONS_READ,
  };
};

export const markNotificationRead = (notificationsId) => {
  return (dispatch) => {
    axios
      .post("/notifications", notificationsId)
      .then((res) => {
        dispatch(markNotificationReadSuccess());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
