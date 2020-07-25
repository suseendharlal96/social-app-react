import React, { useEffect } from "react";
import { Link } from "react-router-dom/Link";

import { connect } from "react-redux";

import dayjs from "dayjs";
import Skeleton from "react-loading-skeleton";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";

import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import Edit from "@material-ui/icons/Edit";

import * as actions from "../redux/actions/index";
import EditProfile from "./EditProfile";
import ProfileSkeleton from "./ProfileSkeleton";

const styles = (theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: theme.palette.primary.main,
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
});
const Profile = (props) => {
  useEffect(() => {
    if (props.authenticated && !props.userData) {
      props.getProfile(props.token);
    }
  }, []);

  const { classes } = props;

  const changeImage = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    console.log(image);
    formData.append("image", image, image.name);
    props.uploadImage(formData, props.token);
  };

  const editPicture = () => {
    const fileInput = document.getElementById("imageUpload");
    fileInput.click();
  };

  const logout = () => {
    props.logout();
  };

  let profile = (
    <React.Fragment>
      {!props.loading ? (
        props.authenticated && props.userData ? (
          <Paper className={classes.paper}>
            <div className={classes.profile}>
              <div className="image-wrapper">
                {!props.imageLoading ? (
                  <React.Fragment>
                    <img
                      className="profile-image"
                      src={props.userData.credentials.imgUrl}
                      alt="profile"
                    />
                    <input
                      type="file"
                      id="imageUpload"
                      hidden="hidden"
                      onChange={changeImage}
                    />
                    <Tooltip title="Edit profile picture" placement="top">
                      <IconButton onClick={editPicture} className="button">
                        <Edit color="primary" />
                      </IconButton>
                    </Tooltip>
                  </React.Fragment>
                ) : (
                  <Skeleton width={200} height={200} circle={true} />
                )}
              </div>
              <hr />
              <div className="profile-details">
                <MuiLink
                  component={Link}
                  variant="h5"
                  cursor="pointer"
                  color="primary"
                  to={`/user/${props.userData.credentials.handler}`}
                >
                  {props.userData.credentials.handler}
                </MuiLink>
                <hr />
                {props.userData.credentials.bio && (
                  <Typography variant="body2">
                    {props.userData.credentials.bio}
                  </Typography>
                )}
                <hr />
                {props.userData.credentials.location && (
                  <React.Fragment>
                    <LocationOn color="primary" />
                    <span>{props.userData.credentials.location}</span>
                  </React.Fragment>
                )}
                <hr />
                {props.userData.credentials.website && (
                  <React.Fragment>
                    <LinkIcon color="primary" />
                    <a
                      href={props.userData.credentials.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      {props.userData.credentials.website}
                    </a>
                  </React.Fragment>
                )}
                <hr />
                {props.userData.credentials.createdAt && (
                  <React.Fragment>
                    <CalendarToday color="primary" />
                    <span>
                      Joined{" "}
                      {dayjs(props.userData.credentials.createdAt).format(
                        "DD MMM YYYY"
                      )}
                    </span>
                  </React.Fragment>
                )}
                <hr />
              </div>
              <EditProfile />
            </div>
          </Paper>
        ) : (
          <Paper className={classes.paper} variant="body2" align="center">
            <Typography>Login to view your profile</Typography>
          </Paper>
        )
      ) : (
        <ProfileSkeleton />
      )}
    </React.Fragment>
  );
  return profile;
};
const mapStateToProps = (state) => {
  return {
    authenticated: state.authReducer.idToken !== null,
    token: state.authReducer.idToken,
    loading: state.userReducer.loading,
    imageLoading: state.userReducer.imageLoading,
    userData: state.userReducer.userData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (token) => dispatch(actions.getProfile(token, false)),
    uploadImage: (formData, token) =>
      dispatch(actions.imageUpload(formData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
