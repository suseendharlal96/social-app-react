import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import axios from "axios";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "./App.css";
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import UserProfile from "./components/pages/userdetail";
import Navbar from "./components/Navbar";

axios.defaults.baseURL =
  "https://us-central1-social-react-a5a3b.cloudfunctions.net/api";
const App = () => {
  const theme = createMuiTheme({
    palette: {
      action: {
        selected: "red",
      },
      primary: {
        light: "#757ce8",
        main: "#40c4ff",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
    typography: {
      useNextVarients: true,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route component={Navbar} path="/" />
        <div className="container">
          <Switch>
            <Route exact component={Home} path="/" />
            <Route exact component={Login} path="/login" />
            <Route
              exact
              component={UserProfile}
              path="/user/:userhandler/scream/:screamId"
            />
            <Route exact component={UserProfile} path="/user/:userhandler" />
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
