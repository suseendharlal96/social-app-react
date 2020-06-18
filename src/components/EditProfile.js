import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import EditIcon from "@material-ui/icons/Edit";

import * as actions from "../redux/actions/index";

const styles = {
  editbutton: {
    position: "relative",
    marginTop: "15px",
  },
  textField: {
    marginBottom: "15px",
  },
};

const EditProfile = (props) => {
  const [bio, setbio] = useState("");
  const [location, setlocation] = useState("");
  const [website, setwebsite] = useState("");
  const [dialogue, setdialogue] = useState(false);

  const { classes } = props;

  useEffect(() => {
    if (props.userData && props.userData.credentials) {
      setUserDetails(props.userData.credentials);
    }
  }, []);

  const setUserDetails = (credentials) => {
    setbio(credentials.bio);
    setlocation(credentials.location);
    setwebsite(credentials.website);
  };

  const handleOpen = () => {
    setdialogue(true);
    setUserDetails(props.userData.credentials);
  };

  const handleClose = () => {
    setdialogue(false);
  };

  const handleChange = (event) => {
    if (event.target.name === "bio") {
      setbio(event.target.value);
    }
    if (event.target.name === "location") {
      setlocation(event.target.value);
    }
    if (event.target.name === "website") {
      setwebsite(event.target.value);
    }
  };

  const handleSubmit = () => {
    const userDetails = {
      bio: bio,
      location: location,
      website: website,
    };

    props.editProfile(userDetails, props.token);
    setdialogue(false);
  };
  return (
    <React.Fragment>
      <Tooltip title="Edit details" placement="top">
        <IconButton onClick={handleOpen} className={classes.editbutton}>
          <EditIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog open={dialogue} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Modify your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              fullWidth
              rows="3"
              placeholder="Write a short bio about yourself"
              className={classes.textField}
              value={bio}
              onChange={handleChange}
            ></TextField>
            <TextField
              name="location"
              type="text"
              label="Location"
              fullWidth
              placeholder="Where are you located at"
              className={classes.textField}
              value={location}
              onChange={handleChange}
            ></TextField>
            <TextField
              name="website"
              type="text"
              label="Website"
              fullWidth
              placeholder="Your personal/professional website"
              className={classes.textField}
              value={website}
              onChange={handleChange}
            ></TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
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
    userData: state.userReducer.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: (userDetails, token) =>
      dispatch(actions.editProfile(userDetails, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditProfile));
