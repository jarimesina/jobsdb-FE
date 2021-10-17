import axios from "axios";
import { Formik } from "formik";
import React from "react";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Register: React.FC = () => {

  const onSubmit = (values: { firstName: any; lastName: any; email: any; password: any; }, { setSubmitting }: any) => {
    axios
      .post("http://localhost:4001/register", {
        firstName: values.firstName,
        lastName: values.lastName,
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
        firstName: "",
        lastName: "",
        password: "",
        email: "",
      }}
      onSubmit={onSubmit}
    >
      {(props: {handleSubmit: any,handleChange: any, handleBlur: any }) => {
        return (
          <form onSubmit={props.handleSubmit}>
            <div>Register</div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
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
