import { FormControl, FormLabel, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from "@material-ui/core";
import { Formik } from "formik";
import { RootState } from "MyTypes";
import React from "react";
import { connect } from "react-redux";
import { selectProfile } from "../store/auth/duck/selectors";
import * as AuthService from '../api/AuthService';
import { EMPLOYEE_COUNT } from "./CreateJob";
interface Props {
  profile: any;
}

const CompanyProfile = ({ profile }: Props) => {

  const onSubmit = (values: any, {setSubmitting}: any) => {
    AuthService.updateCompanyInfo(
      profile._id,
      values.company_name,
      values.about,
      values.benefits,
      values.image,
      values.industry,
      values.numberOfEmployees,
    )
    .then((response) => {
      if(response.status== 200){
        console.log(response.data);
        // TODO: when snackbar provider is created then add it here
        // setIsAlertOpen(true);
        // setInterval(() => {setIsAlertOpen(false);}, 1000);
      }
    })
    .catch((err: any) => {
      // TODO: when snackbar provider is created then add it here
      console.log(err);
    })
    .finally(() => {
      setSubmitting(false);
    });
  };


  return (
    <div className="p-10">
      <Formik
        onSubmit={onSubmit}
        initialValues={profile?.info}
      >
        {({values, handleSubmit, handleChange, handleBlur, setFieldValue}: {values: any, handleSubmit: any,handleChange: any, handleBlur: any, setFieldValue: any }) => {

          return (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-3">
                <FormLabel>Company Name</FormLabel>
                <TextField name="company_name" id="company_name" variant="outlined" size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.company_name}
                />
              </div>

              <div className="flex flex-col mb-3 mt-2">
                <FormLabel>About</FormLabel>
                <TextareaAutosize
                  maxRows={4}
                  name="about" 
                  id="about"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.about}
                  className="border border-solid border-gray"
                />
              </div>

              <div className="flex flex-col mb-3 mt-2">
                <FormLabel>Benefits</FormLabel>
                <TextareaAutosize
                  maxRows={4}
                  name="benefits" 
                  id="benefits"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.benefits}
                  className="border border-solid border-gray"
                />
              </div>

              <div className="flex flex-col mb-3">
                <FormLabel>Industry</FormLabel>
                <TextField name="industry" id="industry" variant="outlined" size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.industry}
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

              <div className="mt-2">
                <FormControl fullWidth variant="standard">
                  <InputLabel id="demo-simple-select-label">Number of Employees</InputLabel>
                  <Select
                    name="numberOfEmployees"
                    id="numberOfEmployees"
                    value={values.numberOfEmployees}
                    label="Number of Employees"
                    onChange={handleChange}
                  >
                    {EMPLOYEE_COUNT.map(number => (
                      <MenuItem value={number.value} key={number.name}>{number.value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <button type="submit" className="my-2 bg-purple-500 px-5 py-2 rounded-md text-white">Submit</button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  profile: selectProfile(state),
});

export default connect(mapStateToProps, null)(CompanyProfile);