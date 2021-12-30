import { RootState } from "MyTypes";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { selectToken } from "../../store/auth/duck/selectors";
import React, { ReactNode } from 'react';
import { Cookies } from "react-cookie";

interface Props{
  component?: ReactNode;
  token: string;
  path: string;
  children: ReactNode;
}

const AuthenticatedRoutes: React.FC<Props> = (props) => {
  // const cookies = new Cookies();
  const token = localStorage.getItem("AUTH_KEY");

  return (

    <Route
      exact
      path={props.path}
      render={routerProps =>
        token ? (
          props.children
        ) : (
          <Redirect to={{pathname: '/login'}} />
        )
      }
    />
  );
}

const mapStateToProps = (state: RootState) => ({
  token: selectToken(state),
});

export default connect(mapStateToProps)(AuthenticatedRoutes);
