import React, { Fragment } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import NoImg from "../images/blank-profile.png";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25,
  },
  cover: {
    minWidth: 200,
    objectFit: "cover",
  },
  handle: {
    width: 70,
    height: 15,
    marginBottom: 7,
    backgroundColor: "#40c4ff",
  },
  date: {
    height: 10,
    width: 100,
    backgroundColor: "rgba(0,0,0, 0.6)",
    marginBottom: 10,
  },
  floatChild: {
    width: "15%",
    float: "left",
    marginBottom: 10,
  },
  fullLine: {
    height: 15,
    width: "90%",
    backgroundColor: "rgba(0,0,0, 0.6)",
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    width: "50%",
    backgroundColor: "rgba(0,0,0, 0.6)",
    marginBottom: 10,
  },
};

const ScreamSkeleton = (props) => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <Skeleton width={115} height={115} circle={true} />
      <CardContent className={classes.cardContent}>
        <SkeletonTheme color="#40c4ff">
          <Skeleton width={100} height={15} />
        </SkeletonTheme>
        <SkeletonTheme color="rgba(0,0,0, 0.6)">
          <Skeleton width={200} height={10} />
        </SkeletonTheme>
        <div>
          <div className={classes.floatChild}>
            <SkeletonTheme color="red">
              <Skeleton width={50} height={10} />
            </SkeletonTheme>
          </div>
          <div className={classes.floatChild}>
            <SkeletonTheme color="#40c4ff">
              <Skeleton width={50} height={10} />
            </SkeletonTheme>
          </div>
        </div>
        <Skeleton width={475} />
        <Skeleton width={620} />
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

export default withStyles(styles)(ScreamSkeleton);
