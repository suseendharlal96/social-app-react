import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "./App.css";
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import UserProfile from "./components/pages/userdetail";
import Navbar from "./components/Navbar";

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
        <Navbar />
        <div className="container">
          <Switch>
            <Route component={Home} exact path="/" />
            <Route component={Login} path="/login" />
            <Route component={UserProfile} path="/user/:userhandler" />
            <Route
              render={() => (
                <Redirect from={{ pathname: "*" }} to={{ pathname: "/" }} />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
