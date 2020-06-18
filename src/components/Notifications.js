import React, { useState } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import NotificationIcon from "@material-ui/icons/Notifications";
import ChatIcon from "@material-ui/icons/Chat";
import FavouriteIcon from "@material-ui/icons/Favorite";

import * as actions from "../redux/actions/index";

const Notifications = (props) => {
  dayjs.extend(relativeTime);

  const [anchorEl, setanchorEl] = useState(null);

  const handleOpen = (event) => {
    setanchorEl(event.target);
  };

  const handleClose = () => {
    setanchorEl(null);
  };

  const menuOpen = () => {
    let unreadNotificationIds = props.notifications.notifications
      .filter((notify) => notify.read === false)
      .map((notify) => notify.notificationId);
    props.markNotificationsRead(unreadNotificationIds);
  };

  let notificationIcon;
  if (
    props.notifications &&
    props.notifications.notifications &&
    props.notifications.notifications.length > 0
  ) {
    props.notifications &&
    props.notifications.notifications.filter((notify) => notify.read === false)
      .length > 0
      ? (notificationIcon = (
          <Badge
            badgeContent={
              props.notifications &&
              props.notifications.notifications.filter(
                (notify) => notify.read === false
              ).length
            }
            color="secondary"
          >
            <NotificationIcon />
          </Badge>
        ))
      : (notificationIcon = <NotificationIcon />);
  } else {
    notificationIcon = <NotificationIcon />;
  }
  const notificationsContent =
    props.notifications &&
    props.notifications.notifications &&
    props.notifications.notifications.length > 0 ? (
      props.notifications &&
      props.notifications.notifications.map((notify) => {
        const verb = notify.type === "like" ? "liked" : "commented on";
        const time = dayjs(notify.createdAt).fromNow();
        const icon =
          notify.type === "like" ? (
            <FavouriteIcon color="secondary" />
          ) : (
            <ChatIcon color="primary" />
          );
        return (
          <MenuItem key={notify.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color={notify.read ? "default" : "secondary"}
              variant="body1"
              to={`user/${notify.receiver}/scream/${notify.screamId}`}
            >
              {notify.sender} {verb} your scream {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You got no notifications yet</MenuItem>
    );
  return (
    <React.Fragment>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={menuOpen}
      >
        {notificationsContent}
      </Menu>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    notifications: state.userReducer.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    markNotificationsRead: (unreadNotificationIds) =>
      dispatch(actions.markNotificationRead(unreadNotificationIds)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
