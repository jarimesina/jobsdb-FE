import { RootState } from "MyTypes";
import React, { Dispatch, useEffect, useState } from "react";
import { connect } from "react-redux";
import * as JobActions from '../store/jobs/duck/actions';
import { selectJobsList } from "../store/jobs/duck/selectors";
import { JobDetails, programmingLanguages } from "./CreateJob";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

interface Props {
  jobs: JobDetails[];
  fetchJobs: () => void;
  filterJobsByDate: (value: string) => void;
  filterJobsByLanguage: (value: string) => void;
}

const Home = ({
  jobs,
  fetchJobs,
  filterJobsByDate,
  filterJobsByLanguage
}: Props) => {
  const [language, setLanguage] = useState('');
  const [time, setTime] = useState('');

  const handleChange = (event: any, cb: { (value: React.SetStateAction<string>): void; (arg0: any): void; }) => {
    cb(event.target.value);
  };

  const timeArr = [
    {
      title: "Today",
      value: "today"
    },
    {
      title: "Last Week",
      value: "lastWeek"
    },
    {
      title: "Last Month",
      value: "lastMonth"
    },
  ];

  const handleReset = () => {
    setLanguage('');
    setTime('');
    fetchJobs();
  }

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs]);

  return (
    <>
      <div className="flex flex-row space-x-2 p-2">
        <div style={{minWidth: 300}}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-label">Programming Language</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={language}
              label="Language"
              onChange={(e) => {
                handleChange(e, setLanguage)
                filterJobsByLanguage(e.target.value);
              }}
            >
              {programmingLanguages.map(language => (
                <MenuItem value={language.value} key={language.name}>{language.value}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={{minWidth: 300}}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-label">Date Posted</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={time}
              label="Date Posted"
              onChange={(e) => { 
                handleChange(e, setTime);
                filterJobsByDate(e.target.value);
              }}
            >
              {timeArr.map(element => (
                <MenuItem value={element.value} key={element.value}>{element.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="justify-center items-center flex">
          <Button variant="contained"  onClick={handleReset}>Reset</Button>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="flex flex-row mx-2 h-screen">
          <div className="w-4/12 flex flex-col overflow-y-auto">
            {
              jobs?.map((job: JobDetails,idx: any)=>{
                return (
                <div key={idx} className="flex flex-row bg-blue-100 py-3 px-2">
                  <div className="w-3/12 flex justify-center">
                    <img className="rounded-full h-14 w-14" src={job.image || "https://picsum.photos/200/300"}/>
                  </div>
                  <div className="w-9/12 border-b-2 border-red-200 pb-2">
                    <h1>{job.title || 'n/a'}</h1>
                    <h2>{job.companyName || 'n/a'}</h2>
                    <h2>{job.location || 'n/a'}</h2>
                  </div>
                </div>)
              })
            }
          </div>
          <div className="w-8/12 bg-red-500 h-screen sticky">
            
          </div>
        </div>
      </div> 
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  jobs: selectJobsList(state)
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchJobs: () => dispatch(JobActions.fetchJobs()),
  filterJobsByDate: (date: string) => dispatch(JobActions.filterJobsByDate(date)),
  filterJobsByLanguage: (language: string) => dispatch(JobActions.filterJobsByLanguage(language)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
