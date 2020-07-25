import React, { useState } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import ChatIcon from "@material-ui/icons/Chat";
import FavouriteIcon from "@material-ui/icons/Favorite";
import FavouriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import DeleteScream from "./DeleteScream";
import ScreamDetails from "./ScreamDetails";

import * as actions from "../redux/actions/index";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: "15px",
  },
  image: {
    width: "200px",
    minWidth: "100px",
    height: "200px",
  },
  content: {
    padding: 20,
  },
};
const Scream = (props) => {
  dayjs.extend(relativeTime);

  const [dialogueBox, setdialogueBox] = useState(false);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState("");

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
      return true;
    } else {
      return false;
    }
  };

  const likeScream = () => {
    props.likeScream(screamId, props.token);
  };

  const unlikeScream = () => {
    props.unlikeScream(screamId, props.token);
  };

  const handleOpen = () => {
    setdialogueBox(true);
  };

  const handleClose = () => {
    setdialogueBox(false);
    setErrors("");
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const postComment = () => {
    if (comment.length !== 0) {
      props.postComment(screamId, { comment: comment }, props.token);
      setdialogueBox(false);
      setComment("");
    } else {
      setErrors("Must not be empty");
    }
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

  const commentButton = !props.authenticated ? (
    <Tooltip title="Post a comment" placement="top">
      <IconButton>
        <Link to="/login">
          <ChatIcon color="primary" />
        </Link>
      </IconButton>
    </Tooltip>
  ) : (
    <React.Fragment>
      <Tooltip title="Post a comment" placement="top">
        <IconButton onClick={handleOpen}>
          <ChatIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog open={dialogueBox} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Comment Dialogue</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your comments will be posted publicly.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            value={comment}
            id="name"
            error={errors.length ? true : false}
            helperText={errors}
            label="Comment"
            placeholder="Post a comment..."
            type="text"
            onChange={handleCommentChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={postComment} color="primary">
            Post comment
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );

  const deleteScreamButton =
    props.authenticated &&
    props.userData &&
    props.userData.credentials &&
    props.userData.credentials.handler === handler ? (
      <DeleteScream screamId={screamId} />
    ) : null;

  return (
    <Card id={props.screamId} className={classes.card}>
      <Grid container spacing={1}>
        <Grid item sm={4} xs={12}>
          <CardMedia
            image={imageUrl}
            title="profile-pic"
            className={classes.image}
          ></CardMedia>
        </Grid>
        <Grid item sm={8} xs={12}>
          <CardContent className={classes.content}>
            <Typography
              variant="h5"
              component={Link}
              to={`user/${handler}`}
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
              {props.authenticated &&
              props.userData &&
              props.userData.likes &&
              props.userData.likes.find(
                (like) => like.screamId === props.screamId
              )
                ? `Liked by you and ${+likeCount - 1} ${
                    +likeCount - 1 > 1 ? "others" : "other"
                  }`
                : +likeCount > 1
                ? `${+likeCount} likes`
                : `${+likeCount} like`}
            </span>
            {commentButton}
            <span>
              {commentCount} {+commentCount > 1 ? "comments" : "comment"}
            </span>
            <ScreamDetails
              scream={props.scream}
              openIndividualScream={props.openIndividualScream || dialogueBox}
            />
          </CardContent>
        </Grid>
      </Grid>
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
    postComment: (screamId, comment, token) =>
      dispatch(actions.postComment(screamId, comment, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Scream));
