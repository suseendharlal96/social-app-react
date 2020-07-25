import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from "@material-ui/icons/Edit";
import * as actions from "../redux/actions/index";

const styles = {
  TextField: {
    marginBottom: "10px",
  },
  button: {
    float: "right",
  },
};

const EditProfile = (props) => {
  const [bio, setbio] = useState("");
  const [website, setwebsite] = useState("");
  const [location, setlocation] = useState("");
  const [dialogue, setDialogue] = useState(false);

  const { classes } = props;

  useEffect(() => {
    console.log(bio);
    setuserDetails(props.userData.credentials);
  }, []);

  const handleOpen = () => {
    setDialogue(true);
    setuserDetails(props.userData.credentials);
  };

  const handleClose = () => {
    setDialogue(false);
  };

  const handleInput = (event) => {
    if (event.target.name === "bio") {
      setbio(event.target.value);
    }
    if (event.target.name === "website") {
      setwebsite(event.target.value);
    }
    if (event.target.name === "location") {
      setlocation(event.target.value);
    }
  };

  const setuserDetails = (credentials) => {
    setbio(credentials.bio ? credentials.bio : "");
    setwebsite(credentials.website ? credentials.website : "");
    setlocation(credentials.location ? credentials.location : "");
  };

  const handleSubmit = () => {
    const editDetails = {
      bio: bio,
      website: website,
      location: location,
    };
    console.log(editDetails);
    props.editProfile(editDetails, props.token);
    handleClose();
  };

  return (
    <React.Fragment>
      <Tooltip title="Edit details" placement="top">
        <IconButton onClick={handleOpen} className={classes.button}>
          <EditIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog open={dialogue} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="Write a short bio.."
              className={classes.TextField}
              value={bio}
              onChange={handleInput}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your Personal/Professional website"
              className={classes.TextField}
              value={website}
              onChange={handleInput}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where are u from.."
              className={classes.TextField}
              value={location}
              onChange={handleInput}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            Save Changes
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
    editProfile: (editData, token) =>
      dispatch(actions.editProfile(editData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditProfile));
