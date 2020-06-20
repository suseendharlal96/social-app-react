import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import dayjs from "dayjs";

import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import * as actions from "../redux/actions/index";
import ScreamComments from "./ScreamComments";

const styles = {
  invisibleBorder: {
    display: "none",
  },
  image: {
    width: "200px",
    minWidth: "100px",
    height: "200px",
  },
  progress: {
    marginLeft: "45%",
  },
  seperator: {
    color: "black",
  },
};

const ScreamDetails = (props) => {
  const [dialogue, setdialogue] = useState(false);
  useEffect(() => {
    console.log(props.openIndividualScream);
    if (props.openIndividualScream === "true" || props.openIndividualScream) {
      setdialogue(true);
      if (
        !props.singleScream.find(
          (single) => single.screamId === props.scream.screamId
        )
      )
        props.getIndividualScream(props.scream.screamId);
    }
  }, [props.openIndividualScream]);
  const { classes } = props;

  const toggle = () => {
    setdialogue(!dialogue);
    if (
      dialogue !== true &&
      !props.singleScream.find(
        (single) => single.screamId === props.scream.screamId
      )
    ) {
      props.getIndividualScream(props.scream.screamId);
    }
  };

  const screamContent = (
    <React.Fragment>
      <ExpansionPanel
        onChange={toggle}
        className={classes.expandpanel}
        expanded={dialogue}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Scream Details</Typography>
        </ExpansionPanelSummary>
        {props.loading &&
        !props.singleScream.find(
          (single) => single.screamId === props.scream.screamId
        ) ? (
          <CircularProgress className={classes.progress} size={50} />
        ) : (
          props.singleScream.map((singleScream) => {
            if (props.scream.screamId === singleScream.screamId) {
              return (
                <React.Fragment key={singleScream.screamId}>
                  <ExpansionPanelDetails>
                    <Grid container spacing={10}>
                      <Grid item sm={5}>
                        <img
                          src={singleScream.imageUrl}
                          className={classes.image}
                          alt="Profile"
                        />
                      </Grid>
                      <Grid item sm={7}>
                        <Typography
                          variant="h5"
                          component={Link}
                          to={`/user/${singleScream.handler}`}
                          color="primary"
                        >
                          @{singleScream.handler}
                        </Typography>
                        <hr className={classes.invisibleBorder} />
                        <Typography variant="body2" color="textSecondary">
                          Posted{" "}
                          {dayjs(singleScream.createdAt).format(
                            "h:mm a, DD MMM YYYY"
                          )}
                        </Typography>
                        <hr className={classes.invisibleBorder} />
                        <Typography variant="body1">
                          {singleScream.scream}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ExpansionPanelDetails>
                  {singleScream.comments &&
                    singleScream.comments.length >= 1 && (
                      <ScreamComments comments={singleScream.comments} />
                    )}
                </React.Fragment>
              );
            }
          })
        )}
      </ExpansionPanel>
    </React.Fragment>
  );

  return <React.Fragment>{screamContent}</React.Fragment>;
};

const mapStateToProps = (state) => {
  return {
    loading: state.screamReducer.individualLoading,
    singleScream: state.screamReducer.singleScream,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getIndividualScream: (screamId) => {
      console.log(screamId);
      return dispatch(actions.getIndividualScream(screamId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ScreamDetails));
