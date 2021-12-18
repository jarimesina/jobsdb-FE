import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { connect } from 'react-redux';
import { Formik } from "formik";
import React, { Dispatch, useEffect } from "react";
import * as AuthActions from '../store/auth/duck/actions';
import { RootState } from "MyTypes";
import { selectUserId } from "../store/auth/duck/selectors";
import { useHistory } from 'react-router-dom';
import Cookies from "react-cookie/cjs/Cookies";

interface Props {
  login: (email: string, password: string) => void;
  userId: string;
}

const Login = ({
  login,
  userId,
 }: Props) => {

  const history = useHistory();

  useEffect(()=> {
    if(userId){
      history.push('/');
    }
  },[
    userId
  ]);

  const onSubmit = async (values: { email: any; password: any; }, { setSubmitting }: any) => {
    try{
      login(values.email, values.password);
      
    }
    catch(err){
      console.log(err);
    }
    setSubmitting(false);
  };
  
  return (
    <Formik
      validator={null}
      initialValues={{
        password: "",
        email: "",
      }}
      onSubmit={onSubmit}
    >
      {(props: {handleSubmit: any,handleChange: any, handleBlur: any }) => {
        return (
          <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="border border-solid flex flex-col justify-center items-center p-10 w-1/4">
              <h2>Login</h2>
              <form onSubmit={props.handleSubmit}>
                <div className="pt-2">
                  <TextField name="email" id="email" label="Email" variant="outlined" size="small"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </div>

                <div className="pt-2">
                <TextField name="password" id="password" label="Password" variant="outlined" size="small"
                    type="password"                  
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                />
                </div>
                <div className="pt-2">
                  <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = (state: RootState, props?: any) => ({
  userId: selectUserId(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  login: (email: string, password: string) => dispatch(AuthActions.login(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export const ConnectedLogin = connect(mapDispatchToProps)(Login);
