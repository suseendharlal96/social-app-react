import React, { useEffect } from "react";

import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";

import Scream from "../../components/Scream";
import Profile from "../../components/Profile";
import * as actions from "../../redux/actions/index";

const Home = (props) => {
  useEffect(() => {
    props.getScreams();
  }, [props.userData]);
  const screamData = !props.loading ? (
    props.screamData ? (
      props.screamData.map((sc, index) => (
        <Scream key={sc.screamId} scream={sc} />
      ))
    ) : (
      <p>No screams found</p>
    )
  ) : (
    <p>Loading...</p>
  );
  return (
    <Grid container spacing={4}>
      <Grid item sm={8} xs={12}>
        {screamData}
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>
          <Profile />
        </p>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    screamData: state.screamReducer.screamData,
    loading: state.screamReducer.loading,
    userData: state.userReducer.userData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getScreams: () => {
      dispatch(actions.getScreams());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
