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

const profilePicChangeSuccess = () => {
  return {
    type: actionTypes.PROFILE_PIC_CHANGE_SUCCESS,
  };
};

export const getProfile = (token, isImageChange) => {
  return (dispatch) => {
    if (!isImageChange) {
      dispatch(getProfileStart());
    } else {
      dispatch(profilePicChangeSuccess());
    }
    axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
    axios
      .get("/user/profileDetails")
      .then((res) => {
        dispatch(getProfileSuccess(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        dispatch(getProfileFail());
      });
  };
};

const editProfileSuccess = (data) => {
  return {
    type: actionTypes.EDIT_PROFILE_SUCCESS,
    editData: data,
  };
};

export const editProfile = (data, token) => {
  axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
  return (dispatch) => {
    axios
      .post("/user/addDetails", data)
      .then((res) => {
        dispatch(editProfileSuccess(data));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const imageUpload = (formData, token) => {
  axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
  console.log(formData);
  return (dispatch) => {
    axios
      .post("/user/image", formData)
      .then(() => {
        dispatch(getProfile(token, true));
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
