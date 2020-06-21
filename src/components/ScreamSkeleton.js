import React, { Fragment } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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
  floatChild: {
    width: "15%",
    float: "left",
    marginBottom: 10,
  },
};

const ScreamSkeleton = (props) => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <Grid container spacing={1}>
        <Grid item sm={2} xs={12}>
          <Skeleton width={115} height={115} circle={true} />
        </Grid>
        <Grid item sm={10} xs={12}>
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
                  <Skeleton width="65%" height={10} />
                </SkeletonTheme>
              </div>
              <div className={classes.floatChild}>
                <SkeletonTheme color="#40c4ff">
                  <Skeleton width="65%" height={10} />
                </SkeletonTheme>
              </div>
            </div>
            <Skeleton width="75%" />
            <Skeleton width="90%" />
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

export default withStyles(styles)(ScreamSkeleton);
