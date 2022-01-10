import { Formik } from "formik";
import React, { useMemo, useState } from "react";
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
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export interface JobDetails {
  _id?: string,
  companyName: string,
  title: string,
  responsibilities: string, // text area
  location: string, // text area
  numberOfEmployees: string,
  languages: string[],
  image: string,
  requirements: string,
  dateCreated?: string,
}

export const programmingLanguages = [
  {
    value: '',
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

  const onSubmit = (values: JobDetails, {setSubmitting}: any) => {
    JobService.createJob(
      {
        companyName: values.companyName,
        title: values.title,
        responsibilities: values.responsibilities,
        requirements: values.requirements,
        location: values.location,
        numberOfEmployees: values.numberOfEmployees,
        languages: values.languages,
        image: values.image,
        dateCreated: new Date()
      }
    )
    .then((response) => {
      if(response.status== 200){
        setIsAlertOpen(true);
        setInterval(() => {setIsAlertOpen(false);}, 1000);
      }
    })
    .catch((err: any) => {
      console.log(err);
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
          companyName: "",
          title: "",
          responsibilities: "",
          location: "",
          numberOfEmployees: "",
          languages: [],
          image: "",
          requirements: ""
        }}
        onSubmit={onSubmit}
      >
        {(props: {handleSubmit: any,handleChange: any, handleBlur: any, setFieldValue: any, values: JobDetails}) => {
          return (
            <form onSubmit={props.handleSubmit}>
              <div className="mx-auto w-1/2 mt-10">
                <span className="text-lg font-bold">Create a new job</span>
                <div className="flex justify-center flex-col">
                  <div className="flex flex-row justify-between space-x-2">
                    <div className="flex flex-col">
                      <JdInput formikName="companyName" onChange={props.handleChange} label="Company: " />
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
                      props.values.languages.map((language, idx) => {
                        return (
                          <Chip key={idx} label={language} size="small" onDelete={() => handleDelete(language, props.setFieldValue, props.values.languages)}/>
                        )
                      })
                    }
                  </span>

                  <div className="mt-2">
                    <FormControl fullWidth variant="standard">
                      <InputLabel id="demo-simple-select-label">Number of Employees</InputLabel>
                      <Select
                        name="numberOfEmployees"
                        id="numberOfEmployees"
                        value={props.values.numberOfEmployees}
                        label="Number of Employees"
                        onChange={props.handleChange}
                      >
                        {EMPLOYEE_COUNT.map(number => (
                          <MenuItem value={number.value} key={number.name}>{number.value}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

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
