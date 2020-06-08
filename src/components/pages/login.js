import React, { useState } from "react";

import axios from "axios";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";

import Appicon from "../../images/talk64.png";
import * as actions from "../../redux/actions/index";

const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    margin: "10px auto",
  },
  textField: {
    marginBottom: "10px",
  },
  button: {
    marginTop: "15px",
    position: "relative",
  },
  generalerror: {
    color: "red",
  },
  spinner: {
    position: "absolute",
  },
  mode: {
    marginTop: "15px",
  },
};
const Login = (props) => {
  const { classes } = props;
  const [loginMode, setLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [handler, sethandler] = useState("");
  const [errors, setErrors] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    if (loginMode) {
      const loginData = {
        email: email,
        password: password,
      };
      props.submitForm(false, loginData, props.history);
    } else {
      const signupData = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        handler: handler,
      };
      props.submitForm(true, signupData, props.history);
    }
  };
  const handleInput = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    }
    if (event.target.name === "password") {
      setPassword(event.target.value);
    }
    if (event.target.name === "confirmPassword") {
      setconfirmPassword(event.target.value);
    }
    if (event.target.name === "nickname") {
      sethandler(event.target.value);
    }
  };
  const toggleMode = () => {
    setLoginMode(!loginMode);
    setErrors({});
    setconfirmPassword("");
    sethandler("");
  };
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={Appicon} alt="scream" className={classes.image} />
        <Typography variant="h4" className={classes.title}>
          {loginMode ? "Login" : "Signup"}
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            value={email}
            helperText={errors.email}
            error={errors.email ? true : false}
            className={classes.textField}
            onChange={handleInput}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            value={password}
            helperText={errors.password}
            error={errors.password ? true : false}
            className={classes.textField}
            onChange={handleInput}
            fullWidth
          />
          {!loginMode && (
            <React.Fragment>
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
                className={classes.textField}
                onChange={handleInput}
                fullWidth
              />
              <TextField
                id="nickname"
                name="nickname"
                type="text"
                label="Nick Name"
                value={handler}
                helperText={errors.handler}
                error={errors.handler ? true : false}
                className={classes.textField}
                onChange={handleInput}
                fullWidth
              />
            </React.Fragment>
          )}
          {errors.error && (
            <Typography variant="body2" className={classes.generalerror}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            className={classes.button}
            color="primary"
            disabled={props.loading}
            disableFocusRipple={true}
          >
            {props.loading ? (
              <CircularProgress size={20} className={classes.spinner} />
            ) : (
              ""
            )}
            {loginMode ? "Login" : "Signup"}
          </Button>
        </form>
        <Button
          variant="outlined"
          className={classes.mode}
          color="secondary"
          onClick={toggleMode}
        >
          {loginMode ? "Switch to Signup" : "Switch to login"}
        </Button>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    loading: state.authReducer.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (isSignup, authData, history) =>
      dispatch(actions.authStart(isSignup, authData, history)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
