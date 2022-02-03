import { Formik } from "formik";
import React from "react";
import { FormControl, FormLabel, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from "@material-ui/core";
import { useSnackbar } from "../contexts/SnackbarContext";

export const UserProfile: React.FC = () => {
  const { show } = useSnackbar();

  // const onSubmit = (_values: any, {setSubmitting}: any) => {
  //   return null;
  // };

  return (
    <div className="p-10">
      <Formik
        onSubmit={() => { return null}}
        initialValues={{
          firstName: '',
          lastName: ''
        }}
      >
        {({values, handleSubmit, handleChange, handleBlur, setFieldValue}: {values: any, handleSubmit: any,handleChange: any, handleBlur: any, setFieldValue: any }) => {

          return (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-3">
                <FormLabel>First Name</FormLabel>
                <TextField name="firstName" id="firstName" variant="outlined" size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
              </div>

              <div className="flex flex-col mb-3">
                <FormLabel>Last Name</FormLabel>
                <TextField name="lastName" id="lastName" variant="outlined" size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
              </div>

              <div className="flex flex-col mb-3">
                <FormLabel>Avatar image</FormLabel>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => {
                    if (e && e.target.files[0]) {
                      const fileReader = new FileReader();
                      fileReader.onload = () => {
                        if (fileReader.readyState === 2) {
                          setFieldValue('image', fileReader.result);
                        }
                      };
                      fileReader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                  onBlur={handleBlur}
                  accept="image/*"
                />
                {values.image && (<img src={values.image} />)}
              </div>

              <button type="submit" className="my-2 bg-purple-500 px-5 py-2 rounded-md text-white">Submit</button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}