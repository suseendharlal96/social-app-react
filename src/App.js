import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "./App.css";
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
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
            <Route exact component={Home} path="/" />
            <Route component={Login} path="/login" />
            <Route component={Signup} path="/signup" />
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
