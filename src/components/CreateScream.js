import React, { useState } from "react";

import { connect } from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import PostAddIcon from "@material-ui/icons/PostAdd";

import * as actions from "../redux/actions/index";

const styles = {
  submitbutton: {
    position: "relative",
    marginTop: "15px",
    float: "right",
  },
  progress: { position: "absolute" },
};

const CreateScream = (props) => {
  const [scream, setscream] = useState("");
  const [dialogue, setdialogue] = useState(false);
  const [errors, setErrors] = useState("");

  const { classes } = props;

  const handleOpen = () => {
    setdialogue(true);
  };

  const handleClose = () => {
    setdialogue(false);
    setErrors("");
  };

  const handleChange = (event) => {
    setscream(event.target.value);
  };

  const postScream = (event) => {
    event.preventDefault();
    if (scream.length > 0) {
      props.postScream({ scream: scream }, props.token);
      setdialogue(false);
    } else {
      setErrors("Must not be empty.");
    }
  };

  return (
    <React.Fragment>
      <Tooltip title="Post a scream" placement="top">
        <IconButton onClick={handleOpen}>
          <PostAddIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={dialogue} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Post your Scream</DialogTitle>
        <DialogContent>
          <form onSubmit={postScream}>
            <TextField
              name="scream"
              type="text"
              label="Scream!"
              placeholder="Post a scream"
              multiline
              fullWidth
              rows="3"
              error={errors.length ? true : false}
              helperText={errors}
              className={classes.textField}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitbutton}
              disabled={props.loading}
            >
              Scream!
              {props.loading && (
                <CircularProgress size={25} className={classes.progress} />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.idToken,
    loading: state.screamReducer.postloading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postScream: (screamData, token) => {
      console.log(screamData);
      return dispatch(actions.postScream(screamData, token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateScream));
