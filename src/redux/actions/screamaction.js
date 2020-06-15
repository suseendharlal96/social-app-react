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

const postScreamStart = () => {
  return {
    type: actionType.POST_SCREAM_START,
  };
};

const postScreamSuccess = (scream) => {
  return {
    type: actionType.POST_SCREAM_SUCCESS,
    scream: scream,
  };
};

const postScreamFail = (error) => {
  return {
    type: actionType.POST_SCREAM_FAIL,
    errors: error,
  };
};

export const postScream = (screamData, token) => {
  axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
  return (dispatch) => {
    dispatch(postScreamStart());
    axios
      .post("/createScream", screamData)
      .then((res) => {
        console.log(res.data);
        dispatch(postScreamSuccess(res.data));
      })
      .catch((err) => {
        dispatch(postScreamFail(err.response.data));
        console.log(err);
      });
  };
};
