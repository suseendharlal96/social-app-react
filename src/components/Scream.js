import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import * as actions from "../redux/actions/index";

const styles = {
  card: {
    display: "flex",
  },
  image: {
    minWidth: "200px",
  },
  content: {
    padding: 20,
  },
};
const Scream = (props) => {
  dayjs.extend(relativeTime);

  const {
    classes,
    scream: {
      screamId,
      commentCount,
      likeCount,
      handler,
      imageUrl,
      scream,
      createdAt,
    },
  } = props;

  const isScreamAlreadyLikedByLoggedInPerson = () => {
    if (
      props.userData.credentials.likes &&
      props.userData.credentials.likes.find(
        (like) => like.screamId === screamId
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  const likeScream = () => {
    props.likeScream();
  };

  const unlikeScream = () => {
    props.unlikeScream();
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        image={imageUrl}
        title="profile-pic"
        className={classes.image}
      ></CardMedia>
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${handler}`}
          color="primary"
        >
          {handler}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{scream}</Typography>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.authReducer.idToken !== null,
    token: state.authReducer.idToken,
    userData: state.userReducer.userData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    likeScream: (screamId, token) =>
      dispatch(actions.likeScream(screamId, token)),
    unlikeScream: (screamId, token) =>
      dispatch(actions.unlikeScream(screamId, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Scream));
