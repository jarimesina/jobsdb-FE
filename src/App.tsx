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

export const App: React.FC = () => {
  return (
    <SnackbarProvider>
      <Provider store={store}>
        <BrowserRouter>
          {/* A <Switch> looks through its children <Route>s and
                  renders the first one that matches the current URL. */}
          <Switch>
            {/* TODO: depending on the role the user should display company profile or  */}
            <AuthenticatedRoutes path="/myProfile">
              <Profile />
            </AuthenticatedRoutes>
            {/* <Route exact path="/mySavedJobs">
              <NewNavigation >
                <SavedJobs />
              </NewNavigation>
            </Route> */}

            <AuthenticatedRoutes path="/mySavedJobs">
              <SavedJobs />
            </AuthenticatedRoutes>

            <Route exact path="/login">
              <Login />
            </Route>
            <AuthenticatedRoutes exact path="/createJob">
              {/* <SideBar>
                <CreateJob />
              </SideBar> */}
              <CreateJob />
            </AuthenticatedRoutes>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <AuthenticatedRoutes exact path="/editJobs">
              {/* <SideBar>
                <EditJobs />
              </SideBar> */}
              <EditJobs />
            </AuthenticatedRoutes>
            <AuthenticatedRoutes path="/" >
              {/* <SideBar>
                <Home/>
              </SideBar> */}
              <Home/>
            </AuthenticatedRoutes>
          </Switch>
        </BrowserRouter>
      </Provider>
    </SnackbarProvider>

  );
};
