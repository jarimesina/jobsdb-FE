import { Button, TextField } from "@material-ui/core";
import { Formik } from "formik";
import React from "react";
import { useHistory } from 'react-router-dom';
import * as AuthService from '../api/AuthService';

export const Register: React.FC = () => {

  const history = useHistory();

  const onSubmit = (values: { firstName: string; lastName: string; email: string; password: string; }, { setSubmitting }: any) => {
    AuthService.signup(
      values.firstName,
      values.lastName,
      values.email,
      values.password,
    ).then((response: any) => {
        if (response.data.redirect === "/") {
          window.location.href = "/";
        } else if (response.data.redirect === "/login") {
          window.location.href = "/login";
        }
      })
    .catch((error) => {
      console.log(error);
    });
    history.push('/');
    setSubmitting(false);
  };

  return (
    <Formik
      validator={null}
      initialValues={{
        firstName: "",
        lastName: "",
        password: "",
        email: "",
      }}
      // TODO: add confirm password feature
      onSubmit={onSubmit}
    >
      {(props: {handleSubmit: any,handleChange: any, handleBlur: any }) => {
        return (
          <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="border border-solid flex flex-col justify-center items-center p-10 w-1/4">
              <h2>Sign Up</h2>
              <form onSubmit={props.handleSubmit}>
                <div className="pt-2">
                  <TextField name="firstName" id="firstName" label="First Name" variant="outlined" size="small"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </div>

                <div className="pt-2">
                  <TextField name="lastName" id="lastName" label="Last Name" variant="outlined" size="small"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </div>

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
