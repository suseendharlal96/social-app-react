import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
import axios from "axios";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";

import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

import Scream from "../Scream";
import ProfileSkeleton from "../ProfileSkeleton";
import ScreamSkeleton from "../ScreamSkeleton";

const styles = {
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
};

const UserDetails = (props) => {
  const [profile, setProfile] = useState(null);
  const [screamId, setscreamId] = useState(null);
  const { classes } = props;
  useEffect(() => {
    console.log(props);
    const userhandler = props.match.params.userhandler;
    const paramscreamId = props.match.params.screamId;
    console.log(props.match);
    if (paramscreamId) {
      setscreamId(paramscreamId);
    }
    axios
      .get(`/user/${userhandler}`)
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.match.params.userhandler]);
  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item sm={4} xs={12}>
          {profile ? (
            profile.user && (
              <Paper className={classes.paper}>
                <div className={classes.profile}>
                  <div className="image-wrapper">
                    <img
                      className="profile-image"
                      src={profile.user.imgUrl}
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
                      to={`/user/${profile.user.handler}`}
                    >
                      {profile.user.handler}
                    </MuiLink>
                    <hr />
                    {profile.user.bio && (
                      <Typography variant="body2">
                        {profile.user.bio}
                      </Typography>
                    )}
                    <hr />
                    {profile.user.location && (
                      <React.Fragment>
                        <LocationOn color="primary" />
                        <span>{profile.user.location}</span>
                      </React.Fragment>
                    )}
                    <hr />
                    {profile.user.website && (
                      <React.Fragment>
                        <LinkIcon color="primary" />
                        <a
                          href={profile.user.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {" "}
                          {profile.user.website}
                        </a>
                      </React.Fragment>
                    )}
                    <hr />
                    {profile.user.createdAt && (
                      <React.Fragment>
                        <CalendarToday color="primary" />
                        <span>
                          Joined{" "}
                          {dayjs(profile.user.createdAt).format("DD MMM YYYY")}
                        </span>
                      </React.Fragment>
                    )}
                    <hr />
                  </div>
                </div>
              </Paper>
            )
          ) : (
            <ProfileSkeleton />
          )}
        </Grid>
      </Grid>
      <hr />
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {profile ? (
            profile.screams && profile.screams.length ? (
              !screamId ? (
                profile.screams.map((scream) => {
                  console.log(0);
                  return <Scream key={scream.screamId} scream={scream} />;
                })
              ) : (
                profile.screams.map((scream) => {
                  console.log(screamId);
                  if (scream.screamId !== screamId) {
                    console.log(1);
                    return <Scream key={scream.screamId} scream={scream} />;
                  } else {
                    console.log(2);
                    return (
                      <Scream
                        key={scream.screamId}
                        scream={scream}
                        openIndividualScream="true"
                      />
                    );
                  }
                })
              )
            ) : (
              "No screams found"
            )
          ) : (
            <ScreamSkeleton />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(UserDetails);
