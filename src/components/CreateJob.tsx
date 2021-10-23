import axios from "axios";
import { Formik, useField } from "formik";
import React from "react";
import { JdInput } from "./shared/JdInput";
import { JdSelect } from "./shared/JdSelect";
import { JdTextArea } from "./shared/JdTextArea";
import { Button, Chip } from '@material-ui/core';

interface JobDetails {
  companyName: string,
  title: string,
  responsibilities: string, // text area
  location: string, // text area
  numberOfEmployees: string,
  languages: string[],
  image: string
}

const programmingLanguages = [
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
]
export const CreateJob: React.FC = () => {

  const onSubmit = (values: JobDetails, {setSubmitting}: any) => {
    axios
      .post("http://localhost:4001/createJob", {
      
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

  const handleOnChange = (e: any, setFieldValue: (val: string, languages: string[]) => void, languages: string[]) => {
    if( !languages.includes(e.target.value)){
      setFieldValue("languages", [...languages, e.target.value]);
    }
  }

  const handleDelete = (languageToDelete: string, setFieldValue: (val: string, languages: string[]) => void, languages: string[]) => {
    setFieldValue("languages", [...languages.filter((language) => languageToDelete !== language)])
  }

  return (
    <div className="h-full h-screen">
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
          console.log("values",props.values);
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
                        name="languages"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        accept="image/*"
                      />
                    </div>
                  </div>
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

                  <JdTextArea formikName="responsibilities" onChange={props.handleChange} label="Responsibilities:"/>
                  <JdTextArea formikName="location" onChange={props.handleChange} label="Location:" />

                </div>

                <button type="submit">Submit</button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
