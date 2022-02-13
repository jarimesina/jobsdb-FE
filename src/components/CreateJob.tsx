import { Formik } from "formik";
import React from "react";
import { JdSelect } from "./shared/JdSelect";
import { Chip, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import Cookies from "react-cookie/cjs/Cookies";
import * as JobService from "../api/JobService";
import { useSnackbar } from "../contexts/SnackbarContext";
import { Button, TextField } from "@material-ui/core";

export interface JobDetails {
  _id?: string,
  companyName?: string,
  title: string,
  responsibilities: string, // text area
  location: string, // text area
  numberOfEmployees?: string,
  languages: string[],
  image: string,
  requirements: string,
  dateCreated?: string,
}

export const PROGRAMMINGLANGUAGES = [
  {
    value: 'Select a language',
    name: 'Select a language',
    isDisabled: true,
  },
  {
    value: 'React',
    name: 'React'
  },
  {
    value: 'Svelte',
    name: 'Svelte'
  },
  {
    value: 'Vue',
    name: 'Vue'
  },
  {
    value: 'Angular',
    name: 'Angular'
  }
];

export const EMPLOYEE_COUNT = [
  {
    value: '1-10',
    name: 'oneToTen'
  },
  {
    value: '11-50',
    name: 'elevenToFifty'
  },
  {
    value: '51-200',
    name: 'fiftyOneToTwoHundred'
  },
  {
    value: '501-1,000',
    name: 'fiveHundredOneToOneThousand'
  },
  {
    value: '1,001-5,000',
    name: 'oneThousandOneToFiveThousand'
  },
];

export const CreateJob: React.FC= () => {
  const cookies = new Cookies();
  const { show } = useSnackbar();

  const onSubmit = (values: any, {setSubmitting, resetForm}: any) => {
    JobService.createJob(
      {
        title: values.title,
        responsibilities: values.responsibilities,
        requirements: values.requirements,
        location: values.location,
        languages: values.languages,
        image: values.image,
        dateCreated: new Date()
      }
    )
    .then((response) => {
      if(response.status == 200){
        show({message: 'Job created successfully', status: 'success'})
        resetForm();
      }
    })
    .catch((err: any) => {
      console.log(err);
      show({message: 'Failed to create a job', status: 'error'})
    })
    .finally(() => {
      setSubmitting(false);
    });
  };

  const handleOnChange = (e: any, setFieldValue: (val: string, languages: string[]) => void, languages: string[]) => {
    if( !languages.includes(e.target.value) && e.target.value !== ""){
      setFieldValue("languages", [...languages, e.target.value]);
    }
  }

  const handleDelete = (languageToDelete: string, setFieldValue: (val: string, languages: string[]) => void, languages: string[]) => {
    setFieldValue("languages", [...languages.filter((language) => languageToDelete !== language)])
  }

  return (
    <div>
      <Formik
        validator={null}
        initialValues={{
          title: "",
          responsibilities: "",
          location: "",
          languages: [],
          image: "",
          requirements: ""
        }}
        onSubmit={onSubmit}
      >
        {({handleSubmit, handleChange, handleBlur, setFieldValue, values}) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className="mx-auto w-1/2 mt-10">
                <span className="text-lg font-bold">Create a new job</span>
                <div className="flex justify-center flex-col">
                  <div className="flex flex-row justify-between space-x-2">
                    <div className="flex flex-col justify-end">
                      <TextField
                        variant="outlined"
                        name="title" 
                        id="title" 
                        label="Title"
                        size="small"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label>Image:</label>
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
                    </div>
                  </div>

                  <label>Languages:</label>
                  <JdSelect formikName="languages" optionList={PROGRAMMINGLANGUAGES} handleOnChange={(e: any) => handleOnChange(e, setFieldValue, values.languages)}/>
                  <span className="space-x-1">
                    {
                      values.languages.map((language: any, idx: number) => {
                        return (
                          <Chip key={idx} label={language} size="small" onDelete={() => handleDelete(language, setFieldValue, values.languages)}/>
                        )
                      })
                    }
                  </span>

                  <FormControl fullWidth margin="dense">
                    <TextField
                      id="responsibilities"
                      name="responsibilities"
                      label="Responsibilities"
                      multiline
                      variant="outlined"
                      maxRows={8}
                      value={values.responsibilities}
                      onChange={handleChange}
                      inputProps={{
                        style: {
                          height: 40,
                        },
                      }}
                    />
                  </FormControl>

                  <FormControl fullWidth margin="dense">
                    <TextField
                      id="location"
                      name="location"
                      label="Location"
                      multiline
                      variant="outlined"
                      maxRows={4}
                      value={values.location}
                      onChange={handleChange}
                      inputProps={{
                        style: {
                          height: 40,
                        },
                      }}
                    />
                  </FormControl>

                  <FormControl fullWidth margin="dense">
                    <TextField
                      id="requirements"
                      name="requirements"
                      label="Requirements"
                      multiline
                      variant="outlined"
                      maxRows={8}
                      value={values.requirements}
                      onChange={handleChange}
                      inputProps={{
                        style: {
                          height: 40,
                        },
                      }}
                    />
                  </FormControl>
                </div>
                <button type="submit" className="my-2 bg-purple-500 px-5 py-2 rounded-md text-white">Submit</button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
