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
import './App.css';
import Profile from "./components/Profile";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import SavedJobs from "./components/SavedJobs";
import NewNavigation from "./components/shared/NewNavigation";

export const App: React.FC = () => {
  return (
    <SnackbarProvider>
      <Provider store={store}>
        <BrowserRouter>
          {/* A <Switch> looks through its children <Route>s and
                  renders the first one that matches the current URL. */}
          <Switch>
            {/* TODO: depending on the role the user should display company profile or  */}
            {/* <Route exact path="/myProfile">
              <SideBar>
                <Profile />
              </SideBar>
            </Route> */}
            <Route exact path="/myProfile">
              <NewNavigation >
                <Profile />
              </NewNavigation>
            </Route>
            <Route exact path="/mySavedJobs">
              {/* <SideBar>
                <SavedJobs />
              </SideBar> */}
              <NewNavigation >
                <Profile />
              </NewNavigation>
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/createJob">
              {/* <SideBar>
                <CreateJob />
              </SideBar> */}
              <NewNavigation >
                <CreateJob />
              </NewNavigation>

            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/editJobs">
              {/* <SideBar>
                <EditJobs />
              </SideBar> */}
              <NewNavigation >
                <EditJobs />
              </NewNavigation>
            </Route>
            <Route exact path="/about">{/* <About /> */}</Route>
            <AuthenticatedRoutes path="/" >
              {/* <SideBar>
                <Home/>
              </SideBar> */}

              <NewNavigation >
                <Home/>
              </NewNavigation>

            </AuthenticatedRoutes>
          </Switch>
        </BrowserRouter>
      </Provider>
    </SnackbarProvider>

  );
};
