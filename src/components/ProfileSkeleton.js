import React from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

import NoImg from "../images/blank-profile.png";

const styles = {
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
    },
  },
};

const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          {/* <img src={NoImg} alt="profile" className="profile-image" /> */}
          <Skeleton width={200} height={200} circle={true} />
        </div>
        <hr />
        <div className="profile-details">
          <SkeletonTheme color="#40c4ff">
            <Skeleton width={150} height={15} />
          </SkeletonTheme>
          <SkeletonTheme color="rgba(0,0,0, 0.6)">
            <Skeleton width={250} height={15} />
          </SkeletonTheme>
          <hr />
          <LocationOn color="primary" /> <Skeleton width={150} height={15} />
          <hr />
          <LinkIcon color="primary" /> <Skeleton width={150} height={15} />
          <hr />
          <CalendarToday color="primary" /> <Skeleton width={100} height={15} />
        </div>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(ProfileSkeleton);
