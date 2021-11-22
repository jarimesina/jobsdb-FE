import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { Formik } from "formik";
import React from "react";

export const Login: React.FC = () => {

  const onSubmit = (values: { email: any; password: any; }, { setSubmitting }: any) => {
    axios
      .post("http://localhost:4001/login", {
        email: values.email,
        password: values.password,
      })
      .then((response: any) => {
        if (response.data.redirect === "/") {
          window.location.href = "/";
        } else if (response.data.redirect === "/login") {
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
