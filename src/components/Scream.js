import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import ChatIcon from "@material-ui/icons/Chat";
import FavouriteIcon from "@material-ui/icons/Favorite";
import FavouriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import DeleteScream from "./DeleteScream";
import * as actions from "../redux/actions/index";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: "15px",
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
      !props.userLoading &&
      props.userData &&
      props.userData.likes &&
      props.userData.likes.find((like) => like.screamId === props.screamId)
    ) {
      console.log(1);
      return true;
    } else {
      console.log(2);
      return false;
    }
  };

  const likeScream = () => {
    props.likeScream(screamId, props.token);
  };

  const unlikeScream = () => {
    props.unlikeScream(screamId, props.token);
  };

  const likeButton = !props.authenticated ? (
    <Tooltip title="Like" placement="top">
      <IconButton>
        <Link to="/login">
          <FavouriteBorderIcon color="secondary" />
        </Link>
      </IconButton>
    </Tooltip>
  ) : isScreamAlreadyLikedByLoggedInPerson() ? (
    <Tooltip title="UnLike" placement="top">
      <IconButton onClick={unlikeScream}>
        <FavouriteIcon color="secondary" />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title="Like" placement="top">
      <IconButton onClick={likeScream}>
        <FavouriteBorderIcon color="secondary" />
      </IconButton>
    </Tooltip>
  );

  const deleteScreamButton =
    props.authenticated &&
    props.userData &&
    props.userData.credentials &&
    props.userData.credentials.handler === handler ? (
      <DeleteScream screamId={screamId} />
    ) : null;

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
        {deleteScreamButton}
        <Typography variant="body2" color="textSecondary">
          Posted {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{scream}</Typography>
        {likeButton}
        <span>
          {likeCount} {+likeCount > 1 ? "Likes" : "Like"}
        </span>
        <Tooltip title="Post a comment" placement="top">
          <IconButton>
            <ChatIcon color="primary" />
          </IconButton>
        </Tooltip>
        <span>
          {commentCount} {+commentCount > 1 ? "comments" : "comment"}
        </span>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.authReducer.idToken !== null,
    token: state.authReducer.idToken,
    userLoading: state.userReducer.loading,
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
