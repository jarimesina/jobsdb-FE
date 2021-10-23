import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Register } from "./components/Register";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { SideBar } from "./components/shared/SideBar";
import { CreateJob } from "./components/CreateJob";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
      <Switch>
        <SideBar>
          <Route exact path="/createJob">
            <CreateJob />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/about">{/* <About /> */}</Route>
          <Route exact path="/">
            <Home />
          </Route>
        </SideBar>
      </Switch>
    </BrowserRouter>
  );
};
