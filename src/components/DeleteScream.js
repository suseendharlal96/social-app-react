import React, { useState } from "react";

import { connect } from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import * as actions from "../redux/actions/index";

const styles = {
  deletebutton: {
    position: "absolute",
    left: "90%",
    top: "10%",
  },
};
const DeleteScream = (props) => {
  const [dialogue, setdialogue] = useState(false);

  const { classes } = props;

  const handleOpen = () => {
    setdialogue(true);
  };

  const handleClose = () => {
    setdialogue(false);
  };

  const deleteScream = () => {
    props.deleteScream(props.screamId, props.token);
    setdialogue(false);
  };

  return (
    <React.Fragment>
      <Tooltip title="Delete Scream?" placement="top">
        <IconButton onClick={handleOpen} className={classes.deletebutton}>
          <DeleteOutlineIcon color="secondary" />
        </IconButton>
      </Tooltip>
      <Dialog open={dialogue} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure want to delete this scream?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteScream} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.idToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteScream: (screamId, token) =>
      dispatch(actions.deleteScream(screamId, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DeleteScream));
