import React, { useState } from "react";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = {
  comment: {
    marginLeft: 20,
  },
  commentImg: {
    width: "100%",
    height: 100,
    objectFit: "contain",
    borderRadius: "50%",
  },
  invisibleBorder: {
    display: "none",
  },
};

const ScreamComments = (props) => {
  dayjs.extend(relativeTime);

  const [comment, setcomment] = useState(false);

  const { classes } = props;

  const toggleComment = () => {
    setcomment(!comment);
  };
  return (
    <ExpansionPanel onChange={toggleComment} expanded={comment}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          {props.comments.length > 1 ? "Comments" : "Comment"}(
          {props.comments.length})
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container>
          {props.comments.map((comment) => {
            return (
              <React.Fragment key={comment.createdAt}>
                <Grid item sm={5}>
                  <img
                    src={comment.imageUrl}
                    alt="commentimg"
                    className={classes.commentImg}
                  />
                </Grid>
                <Grid item sm={7}>
                  <div className={classes.comment}>
                    <Typography
                      variant="h5"
                      component={Link}
                      to={`/user/${comment.handler}`}
                    >
                      {comment.handler}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Commented on :
                      <br />
                      {dayjs(comment.createdAt).format("h:mm a, DD MMM YYYY")}(
                      {dayjs(comment.createdAt).fromNow()})
                    </Typography>
                    <hr className={classes.invisibleBorder} />
                    <Typography variant="body1">{comment.desc}</Typography>
                  </div>
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default withStyles(styles)(ScreamComments);
