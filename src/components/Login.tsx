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
          <form onSubmit={props.handleSubmit}>
            <div>Login</div>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />

            <button type="submit">Submit</button>
          </form>
        );
      }}
    </Formik>
  );
};
