import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import * as actions from "../redux/actions/index";
import CreateScream from "./CreateScream";

const Navbar = (props) => {
  const logout = () => {
    props.logout();
  };

  return (
    <AppBar>
      <Toolbar className="nav-container">
        {props.authenticated ? (
          <React.Fragment>
            <Tooltip title="Home" placement="top">
              <IconButton>
                <Link to="/home">
                  <HomeIcon />
                </Link>
              </IconButton>
            </Tooltip>
            <CreateScream />
            <Tooltip title="Notifications" placement="top">
              <IconButton>
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout" placement="top">
              <IconButton onClick={logout}>
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Tooltip title="Home" placement="top">
              <IconButton>
                <Link to="/home">
                  <HomeIcon />
                </Link>
              </IconButton>
            </Tooltip>
            <Tooltip title="Login/Signup" placement="top">
              <IconButton>
                <Link to="/login">
                  <AccountCircleIcon />
                </Link>
              </IconButton>
            </Tooltip>
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
