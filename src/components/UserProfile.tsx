import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Dispatch } from 'redux';
import { FormControl, FormLabel, InputLabel, TextField } from "@material-ui/core";
import { useSnackbar } from "../contexts/SnackbarContext";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import * as AuthActions from '../store/auth/duck/actions';

interface IFooProps {
  profile: any;
}

interface IFooInjectedProps extends IFooProps {
  updateNormalUser: (id: string, firstName: string, lastName: string, image: string) => void;
}

export const UserProfile = ({ profile, updateNormalUser } : IFooInjectedProps) => {
  const { show } = useSnackbar();
  const [isEdit, setIsEdit] = useState(false);

  const onSubmit = async (values: any, {setSubmitting}: any) => {
    try{
      setSubmitting(false);
      console.log("profile._id", profile);
      // const res = await AuthService.updateNormalUser(profile._id, values.firstName, values.lastName, values.image);
      updateNormalUser(profile._id, values.firstName, values.lastName, values.image);
      // if(res?.status === 200){
      //   show({message: 'Profile Updated!', status: 'success'});
      // }

    } catch(err){
      show({message: 'Profile failed to update', status: 'error'});

      console.log(err);
    } finally {
      setSubmitting(true);
    }
  };

  // TODO: improve the redux state management to make ui look like automatic update
  // TODO: make forms look like the happyer ones
  // TODO: add translation feature
  return (
    <div className="py-6 px-10 bg-white w-1/2 rounded-lg flex flex-col mt-10 mx-auto shadow-md">
      <div className="flex justify-between items-center mb-5">
        <div className="text-4xl">User Profile</div>
      </div>
      <Formik
        onSubmit={onSubmit}
        initialValues={{
          firstName: profile.info.first_name,
          lastName: profile.info.last_name,
          image: profile.info.image,
        }}
      >
        {({values, handleSubmit, handleChange, handleBlur, setFieldValue}: {values: any, handleSubmit: any,handleChange: any, handleBlur: any, setFieldValue: any }) => {

          return (
            <form onSubmit={handleSubmit} className="rounded-md">
              <div className="flex flex-col mb-3">
                <FormLabel required>First Name</FormLabel>
                <TextField name="firstName" id="firstName" variant="outlined" size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
              </div>

              <div className="flex flex-col mb-3">
                <FormLabel required>Last Name</FormLabel>
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
                  id="image"
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
                <div className="w-20 h-20">
                  {values.image && (<img src={values.image} className="w-full h-full object-cover rounded-full" />)}
                </div>
              </div>

              <button type="submit" className="my-2 bg-purple-500 px-5 py-2 rounded-md text-white">Save Changes</button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateNormalUser: (id: string, firstName: string, lastName: string, image: string) => dispatch(AuthActions.updateNormalUser(id, firstName, lastName, image)),
});

export default connect(null, mapDispatchToProps)(UserProfile);
