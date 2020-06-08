import React, { useState, useEffect } from "react";

import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Scream from "../../components/Scream";

const Home = () => {
  const [screams, setScreams] = useState(null);
  useEffect(() => {
    axios
      .get("/screams")
      .then((res) => {
        console.log(res.data);
        setScreams(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const screamData = screams ? (
    screams.map((sc, index) => <Scream key={index} scream={sc} />)
  ) : (
    <p>Loading...</p>
  );
  return (
    <Grid container spacing={4}>
      <Grid item sm={8} xs={12}>
        {screamData}
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>Profile</p>
      </Grid>
    </Grid>
  );
};

export default Home;
