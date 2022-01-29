import { Formik } from "formik";
import React, { useState } from "react";
import { JdInput } from "./shared/JdInput";
import { JdSelect } from "./shared/JdSelect";
import { JdTextArea } from "./shared/JdTextArea";
import { Chip } from '@material-ui/core';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Cookies from "react-cookie/cjs/Cookies";
import CloseIcon from "../../src/images/closeIcon.svg";
import * as JobService from "../api/JobService";
import { useSnackbar } from "../contexts/SnackbarContext";

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

export const programmingLanguages = [
  {
    value: 'Select a language',
    name: 'Select a language'
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
  const [isAlertOpen, setIsAlertOpen ] = useState(false);
  const [employeeNumber, setEmployeeNumber] = useState();
  const { show } = useSnackbar();

  const onSubmit = (values: any, {setSubmitting}: any) => {
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
        setIsAlertOpen(true);
        setInterval(() => {setIsAlertOpen(false);}, 1000);
      }
      show({message: 'Job created successfully', status: 'success'})
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
      {
        isAlertOpen && (
          // change this into a snackbar type on the lower left of the screen
          <Collapse in={isAlertOpen}>
            <Alert severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setIsAlertOpen(false);
                  }}
                >
                  <img src={CloseIcon} alt="React Logo" width={20}/>
                </IconButton>
              }
            >
              <AlertTitle>Success</AlertTitle>
              Job successfully created!
            </Alert>
          </Collapse>
        )
      }
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
        {(props: {handleSubmit: any,handleChange: any, handleBlur: any, setFieldValue: any, values: any}) => {
          return (
            <form onSubmit={props.handleSubmit}>
              <div className="mx-auto w-1/2 mt-10">
                <span className="text-lg font-bold">Create a new job</span>
                <div className="flex justify-center flex-col">
                  <div className="flex flex-row justify-between space-x-2">
                    <div className="flex flex-col">
                      <JdInput formikName="title" onChange={props.handleChange} label="Job title:" />
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
                                props.setFieldValue('image', fileReader.result);
                              }
                            };
                            fileReader.readAsDataURL(e.target.files[0]);
                          }
                        }}
                        onBlur={props.handleBlur}
                        accept="image/*"
                      />
                    </div>
                  </div>

                  <label>Languages:</label>
                  <JdSelect formikName="languages" optionList={programmingLanguages} handleOnChange={(e: any) => handleOnChange(e,props.setFieldValue,props.values.languages)}/>
                  <span className="space-x-1">
                    {
                      props.values.languages.map((language: any, idx: number) => {
                        return (
                          <Chip key={idx} label={language} size="small" onDelete={() => handleDelete(language, props.setFieldValue, props.values.languages)}/>
                        )
                      })
                    }
                  </span>


                  <div className="mt-2">
                   <JdTextArea formikName="responsibilities" onChange={props.handleChange} label="Responsibilities:"/>
                  </div>

                  <div className="mt-2">
                    <JdTextArea formikName="location" onChange={props.handleChange} label="Location:" />
                  </div>

                  <div className="mt-2">
                   <JdTextArea formikName="requirements" onChange={props.handleChange} label="Requirements:"/>
                  </div>

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
