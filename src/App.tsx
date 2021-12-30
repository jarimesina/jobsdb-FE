import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Register } from "./components/Register";
import Home from "./components/Home";
import Login  from "./components/Login";
import SideBar from "./components/shared/SideBar";
import { CreateJob } from "./components/CreateJob";
import { Provider } from "react-redux";
import store from "./store";
import AuthenticatedRoutes from "./components/shared/AuthenticatedRoutes";
import EditJobs from "./components/EditJobs";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/createJob">
            <SideBar>
              <CreateJob />
            </SideBar>
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/editJobs">
            <SideBar>
              <EditJobs />
            </SideBar>
          </Route>
          <Route exact path="/about">{/* <About /> */}</Route>
          <AuthenticatedRoutes path="/" >
            <SideBar>
              <Home/>
            </SideBar>
          </AuthenticatedRoutes>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};
