import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FormControl, FormLabel, InputLabel, TextField } from "@material-ui/core";
import { useSnackbar } from "../contexts/SnackbarContext";
import { Button } from "@material-ui/core";
import Edit from '@material-ui/icons/Edit';
import * as AuthService from '../api/AuthService';

interface Props {
  profile?: any;
}

export const UserProfile = ({ profile } : Props) => {
  const { show } = useSnackbar();
  const [isEdit, setIsEdit] = useState(false);

  console.log('profile', profile);
  useEffect(() => {
    console.log('profile', profile);
  }, [profile]);

  const onSubmit = async (values: any, {setSubmitting}: any) => {
    try{
      setSubmitting(false);
      console.log("profile._id", profile);
      const res = await AuthService.updateNormalUser(profile._id, values.firstName, values.lastName, values.image);

      if(res.status === 200){
        show({message: 'Profile Updated!', status: 'success'});
      }

    } catch(err){
      show({message: 'Profile failed to update', status: 'error'});

      console.log(err);
    } finally {
      setSubmitting(true);
    }
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-5">
        <div className="text-4xl">User Profile</div>
        <div>
          {
            isEdit ? (
              <Button variant="contained" onClick={() => {
                setIsEdit(false)
              }}>
                Display Data
              </Button>
            ) : (
              <Button className="text-xl" variant="contained" startIcon={<Edit />} onClick={() => {
                setIsEdit(true)
              }}>
                Edit
              </Button>
            )
          }
          
        </div>
      </div>

      {isEdit ? (
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
              <form onSubmit={handleSubmit}>
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

                <button type="submit" className="my-2 bg-purple-500 px-5 py-2 rounded-md text-white">Submit</button>
              </form>
            );
          }}
        </Formik>
      ): (
        <div>
          <div className="w-20 h-20" >
            <img className="w-full h-full object-cover rounded-full" src={profile.info.image} />
          </div>
          <div>
            First Name
          </div>
          <div>
            {profile.info.first_name || "Field is not filled up"}
          </div>

          <div className="mt-3">Last Name</div>
          <div>
            {profile.info.last_name || "Field is not filled up"}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;