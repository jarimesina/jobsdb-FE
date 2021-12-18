import axios from "axios";
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

export interface JobDetails {
  companyName: string,
  title: string,
  responsibilities: string, // text area
  location: string, // text area
  numberOfEmployees: string,
  languages: string[],
  image: string,
  dateCreated?: string,
}

export const programmingLanguages = [
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

export const CreateJob: React.FC= () => {
  const cookies = new Cookies();
  const [isAlertOpen, setIsAlertOpen ] = useState(false);
  const temp = cookies.get('AUTH_KEY');

  const onSubmit = (values: JobDetails, {setSubmitting}: any) => {
    axios
      .post("http://localhost:4001/job", {
        companyName: values.companyName,
        title: values.title,
        responsibilities: values.responsibilities,
        location: values.location,
        numberOfEmployees: values.numberOfEmployees,
        languages: values.languages,
        image: values.image,
        dateCreated: new Date(),
      },{
        headers: {"Authorization": `Bearer ${temp}`},
      })
      .then((response: any) => {
        if(response.data.message==="POST new job"){
          setIsAlertOpen(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setSubmitting(false);
  };

  const handleOnChange = (e: any, setFieldValue: (val: string, languages: string[]) => void, languages: string[]) => {
    if( !languages.includes(e.target.value)){
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
                x
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
          image: ""
        }}
        onSubmit={onSubmit}
      >
        {(props: {handleSubmit: any,handleChange: any, handleBlur: any, setFieldValue: any, values: JobDetails}) => {
          return (
            <form onSubmit={props.handleSubmit}>
              <div className="mx-auto w-1/2 mt-10">
                <h1>Create a new job</h1>
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
                   <JdTextArea formikName="responsibilities" onChange={props.handleChange} label="Responsibilities:"/>
                  </div>

                  <div className="mt-2">
                    <JdTextArea formikName="location" onChange={props.handleChange} label="Location:" />
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
