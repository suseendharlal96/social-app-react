import React from "react";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    display: "flex",
    marginBottom: "15px",
  },
  image: {
    minWidth: "200px",
  },
  content: {
    padding: 20,
  },
};
const Scream = (props) => {
  dayjs.extend(relativeTime);

  const {
    classes,
    scream: {
      screamId,
      commentCount,
      likeCount,
      handler,
      imageUrl,
      scream,
      createdAt,
    },
  } = props;

  const isScreamAlreadyLikedByThisUser=()=>{
if(props.userData.likes && props.userData.likes.find(like=>like))
  }

  const likeScream = () => {
    props.likeScream(screamId);
  };

  const unlikeScream = () => {
    props.unlikeScream(screamId);
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        image={imageUrl}
        title="profile-pic"
        className={classes.image}
      ></CardMedia>
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${handler}`}
          color="primary"
        >
          {handler}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{scream}</Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(Scream);
