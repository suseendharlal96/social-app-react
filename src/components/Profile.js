import React from "react";
import { Link } from "react-router-dom/Link";

import { connect } from "react-redux";

import dayjs from "dayjs";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import withStyles from "@material-ui/core/styles/withStyles";

import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

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
  const { classes } = props;
  let profile = (
    <React.Fragment>
      {!props.loading ? (
        props.authenticated ? (
          <Paper className={classes.paper}>
            <div className={classes.profile}>
              <div className="image-wrapper">
                <img
                  className="profile-image"
                  src={props.userData.credentials.imgUrl}
                  alt="profile"
                />
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
            </div>
          </Paper>
        ) : (
          <Paper className={styles.paper} variant="body2" align="center">
            <Typography>Login to view your profile</Typography>
          </Paper>
        )
      ) : (
        <div>loading</div>
      )}
    </React.Fragment>
  );
  return profile;
};
const mapStateToProps = (state) => {
  return {
    authenticated: state.authReducer.idToken !== null,
    loading: state.userReducer.loading,
    userData: state.userReducer.userData,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Profile));
