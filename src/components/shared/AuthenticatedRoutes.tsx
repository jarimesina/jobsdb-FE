import { RootState } from "MyTypes";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { selectToken } from "../../store/auth/duck/selectors";
import React, { ReactNode } from 'react';
import { Cookies } from "react-cookie";
import NewNavigation from "./NewNavigation";

interface Props{
  path: string;
  children: ReactNode;
  [otherProps: string]: any;
}

const AuthenticatedRoutes = ({children, path, otherProps } : Props) => {
  // const cookies = new Cookies();
  const token = localStorage.getItem("AUTH_KEY");

  return (
    <Route {...otherProps} path={path}>
      <NewNavigation>
        {children}
      </NewNavigation> 
    </Route>
    // <Route
    //   exact
    //   path={props.path}
    //   render={routerProps =>
    //     token ? (
    //       props.children
    //     ) : (
    //       <Redirect to={{pathname: '/login'}} />
    //     )
    //   }
    // />
  );
}

const mapStateToProps = (state: RootState) => ({
  token: selectToken(state),
});

export default connect(mapStateToProps, null)(AuthenticatedRoutes);
