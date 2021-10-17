import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Register } from "./components/Register";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { SideBar } from "./components/shared/SideBar";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
      <Switch>
        <SideBar>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/about">{/* <About /> */}</Route>
          <Route path="/">
            <Home />
          </Route>
        </SideBar>
      </Switch>
    </BrowserRouter>
  );
};
