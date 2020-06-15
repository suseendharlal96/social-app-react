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

const likeScreamSuccess = (data) => {
  return {
    type: actionType.LIKE_SCREAM_SUCCESS,
    likeunlikeData: data,
  };
};

const unlikeScreamSuccess = (data) => {
  return {
    type: actionType.UNLIKE_SCREAM_SUCCESS,
    likeunlikeData: data,
  };
};

export const likeScream = (screamId, token) => {
  axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
  return (dispatch) => {
    axios
      .get(`/scream/${screamId}/like`)
      .then((res) => {
        console.log(res.data);
        dispatch(likeScreamSuccess(res.data));
      })
      .catch((err) => console.log(err));
  };
};

export const unlikeScream = (screamId, token) => {
  axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
  return (dispatch) => {
    axios
      .get(`/scream/${screamId}/unlike`)
      .then((res) => {
        console.log(res.data);
        dispatch(unlikeScreamSuccess(res.data));
      })
      .catch((err) => console.log(err));
  };
};

const deleteScreamSuccess = (screamId) => {
  return {
    type: actionType.DELETE_SCREAM_SUCCESS,
    deletedId: screamId,
  };
};

export const deleteScream = (screamId, token) => {
  axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
  return (dispatch) => {
    axios
      .delete(`/scream/${screamId}`)
      .then((res) => {
        dispatch(deleteScreamSuccess(screamId));
      })
      .catch((err) => console.log(err));
  };
};
