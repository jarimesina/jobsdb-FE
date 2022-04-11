import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Register } from "./components/Register";
import Home from "./components/Home";
import Login  from "./components/Login";
import { CreateJob } from "./components/CreateJob";
import { Provider } from "react-redux";
import store from "./store";
import AuthenticatedRoutes from "./components/shared/AuthenticatedRoutes";
import EditJobs from "./components/EditJobs";
import './App.css';
import Profile from "./components/Profile";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import SavedJobs from "./components/SavedJobs";
import AppliedJobs from "./components/AppliedJobs";

export const App: React.FC = () => {
  return (
    <SnackbarProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <AuthenticatedRoutes path="/myProfile">
              <Profile />
            </AuthenticatedRoutes>

            <AuthenticatedRoutes path="/myAppliedJobs">
              <AppliedJobs />
            </AuthenticatedRoutes>

            <AuthenticatedRoutes path="/mySavedJobs">
              <SavedJobs />
            </AuthenticatedRoutes>

            <Route exact path="/login">
              <Login />
            </Route>

            <AuthenticatedRoutes exact path="/createJob">
              <CreateJob />
            </AuthenticatedRoutes>

            <Route exact path="/register">
              <Register />
            </Route>

            <AuthenticatedRoutes exact path="/editJobs">
              <EditJobs />
            </AuthenticatedRoutes>

            <AuthenticatedRoutes path="/" >
              <Home/>
            </AuthenticatedRoutes>
          </Switch>
        </BrowserRouter>
      </Provider>
    </SnackbarProvider>

  );
};
