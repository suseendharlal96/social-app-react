import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import ExitToApp from "@material-ui/icons/ExitToApp";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Notifications from "@material-ui/icons/Notifications";

import * as actions from "../redux/actions/index";

const Navbar = (props) => {
  const logout = () => {
    props.logout();
  };
  return (
    <AppBar>
      <Toolbar className="nav-container">
        {props.authenticated ? (
          <React.Fragment>
            <Link to="/">
              <Tooltip title="Home" placement="top">
                <IconButton>
                  <HomeIcon />
                </IconButton>
              </Tooltip>
            </Link>
            <Tooltip title="Post a scream!" placement="top">
              <IconButton>
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications" placement="top">
              <IconButton>
                <Notifications />
              </IconButton>
            </Tooltip>
            <Tooltip title="logout" placement="top">
              <IconButton onClick={logout}>
                <ExitToApp />
              </IconButton>
            </Tooltip>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to="/">
              <Tooltip title="Home" placement="top">
                <IconButton>
                  <HomeIcon />
                </IconButton>
              </Tooltip>
            </Link>
            <Link to="/login">
              <Tooltip title="signup/signin" placement="top">
                <IconButton>
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            </Link>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.authReducer.idToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
