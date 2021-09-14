import React, { Fragment } from "react";
import NotFound from "./Components/NotFound";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";

import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

import { Redirect, Route, Switch } from "react-router-dom";

import "./App.css";

export default function App() {
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <ProtectedRoute path="/home" component={Home} />

        <Route path="/404" component={NotFound} />
        <Redirect path="/" exact to="/register" />
        <Redirect path="*" to="/404" />
      </Switch>
    </Fragment>
  );
}
