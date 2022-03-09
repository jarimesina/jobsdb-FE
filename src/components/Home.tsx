import { RootState } from "MyTypes";
import React, { Dispatch, useEffect, useState } from "react";
import { connect } from "react-redux";
import * as JobActions from '../store/jobs/duck/actions';
import { selectJobsList, selectTotalJobs } from "../store/jobs/duck/selectors";
import { JobDetails, PROGRAMMINGLANGUAGES } from "./CreateJob";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import moment from 'moment';
import Briefcase from '../images/briefcase.svg';
import Building from '../images/building.svg';
import TablePagination from '@mui/material/TablePagination';
import { selectProfile } from "../store/auth/duck/selectors";
import * as AuthService from "../api/AuthService";
import { useSnackbar } from "../contexts/SnackbarContext";

interface Props {
  jobs: JobDetails[];
  total: number;
  fetchJobs: (skip?: number, limit?: number, language?: string, dateRange?: string) => void;
  profile: any;
}

// TODO: add feature to hide save button if user has already saved the job
// TODO: add feature to prevent user from going back after logging out
const Home = ({
  jobs,
  total,
  fetchJobs,
  profile,
}: Props) => {
  const [language, setLanguage] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [displayedJobs, setDisplayedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { show } = useSnackbar();
  
  useEffect(() => {
    if(jobs){
      setDisplayedJobs(jobs);
      setSelectedJob(jobs[0]);
    }
  }, [jobs]);

  const handleChangeLanguage = (event: any, cb: { (value: React.SetStateAction<string>): void; (arg0: any): void; }) => {
    cb(event.target.value);
    setPage(0);
    setRowsPerPage(10);
    fetchJobs(page*rowsPerPage, rowsPerPage, event.target.value, dateRange);
  };

  const handleChangeDate = (event: any, cb: { (value: React.SetStateAction<string>): void; (arg0: any): void; }) => {
    cb(event.target.value);
    setPage(0);
    setRowsPerPage(10);
    fetchJobs(page*rowsPerPage, rowsPerPage, language, event.target.value);
  };

  const timeArr = [
    {
      title: "Today",
      value: "today"
    },
    {
      title: "Past Week",
      value: "pastWeek"
    },
    {
      title: "Past Month",
      value: "pastMonth"
    },
    {
      title: "Any Time",
      value: "anyTime"
    }
  ];

  const handleReset = () => {
    setLanguage('');
    setDateRange('');
    fetchJobs(0, 10, '', '');
  }

  useEffect(() => {
    fetchJobs(page, rowsPerPage, language, dateRange);
  }, [fetchJobs]);

  const handleJobClick = (job: any) => {
    setSelectedJob(job);
  }
  
  const handleChangePage = (event: any, newPage: any) => {
    fetchJobs(newPage*rowsPerPage, rowsPerPage, language, dateRange);
    setPage(newPage);
  };

  const calculateTimeAgo = (date: string) => {
    const now = moment();
    return now.diff(date, "days");
  }

  return (
    <>
      <div className="flex flex-row space-x-2 p-2 bg-white ">
        <div style={{minWidth: 300}}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-label">Programming Language</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={language}
              label="Language"
              onChange={(e) => {
                handleChangeLanguage(e, setLanguage)
              }}
            >
              {PROGRAMMINGLANGUAGES.map(language => (
                <MenuItem disabled={language?.isDisabled} value={language.value} key={language.name}>{language.value}</MenuItem>
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
              value={dateRange}
              label="Date Posted"
              onChange={(e) => {
                handleChangeDate(e, setDateRange);
              }}
            >
              {timeArr.map(element => (
                <MenuItem value={element.value} key={element.value}>{element.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="justify-center items-end flex">
          <Button variant="contained" onClick={handleReset}>Reset</Button>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="flex flex-row mx-2 h-screen">
          <div className="w-5/12 flex flex-col">
            <div className="flex flex-col overflow-y-auto">
              {
                displayedJobs.map((job: JobDetails,idx: any)=>{
                  return (
                    <div key={idx} className={`${job?._id === selectedJob._id && "bg-blue-200"} group flex flex-row bg-white py-3 px-2 cursor-pointer`} onClick={() => handleJobClick(job)}>
                      <div className="w-3/12 flex justify-center">
                        <img className="rounded-full h-14 w-14" src={job.image || "https://picsum.photos/200/300"}/>
                      </div>
                      <div className="flex flex-col w-9/12 border-b-2 border-gray-200 pb-2">
                        <span className="text-blue-400 group-hover:underline">{job.title || 'n/a'}</span>
                        <span>{job.companyName || 'n/a'}</span>
                        <span>{job.location || 'n/a'}</span>
                        <span>Posted {calculateTimeAgo(job.dateCreated)} days ago</span>
                      </div>
                    </div>
                  );
                })
              }
            </div>
            <div>
              <TablePagination
                component="div"
                count={total}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
              />
            </div>
          </div>

          <div className="w-8/12 bg-white h-screen sticky overflow-y-auto">
            {
              selectedJob && (
                <div className="p-5">
                  <div className="text-2xl">{selectedJob.title}</div>
                  <div className="text-md mt-2">{selectedJob?.owner?.info?.company_name + " | " + selectedJob?.location + " | " + "Posted on " + moment(selectedJob.dateCreated).format("DD-MM-YYYY")}</div>

                  <div className="mt-5 mb-2">
                    <div className="mt-2 flex space-x-2">
                      <div className="flex items-center">
                        <img src={Briefcase} alt="React Logo" width={20}/>
                      </div>
                      <span>
                        Full-time
                      </span>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <div className="flex items-center">
                        <img src={Building} alt="React Logo" width={20}/>
                      </div>
                      <span>
                        {selectedJob?.owner?.info?.numberOfEmployees} Employees
                      </span>
                    </div>
                    { profile?.role == 1 && (
                      <div className="mt-5 flex flex-row space-x-3">
                        <div>
                          <Button variant="outlined" className="rounded-lg">Apply</Button>
                        </div>
                        <div>
                          <Button variant="contained" className="rounded-lg" onClick={async ()=>{
                            try{
                              const res = await AuthService.saveJob(selectedJob._id, profile._id);

                              if(res.status === 200){
                                show({message: 'Job added!', status: 'success'})
                              }
                            }
                            catch(err){
                              show({message: 'Failed to add job', status: 'error'})
                            }
                          }}>Save</Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <hr className="mt-5 mb-5"/>
                  <img src={selectedJob?.owner?.info?.image} width='23%' height="auto"/>
                  <div>
                    <div>Company Overview:</div>
                    <div>{selectedJob?.owner?.info?.about}</div>
                  </div>
                  <div>
                    <div>Industry:</div>
                    <div>{selectedJob?.owner?.info?.industry}</div>
                  </div>
                  <div>
                    <div>Benefits:</div>
                    <pre>{selectedJob?.owner?.info?.benefits}</pre>
                  </div>
                  <div>
                    <div>Responsibilities:</div>
                    <pre>
                      {selectedJob.responsibilities}
                    </pre>
                  </div>
                  <div>
                    <div>Requirements:</div>
                    <pre>
                      {selectedJob.requirements}
                    </pre>
                  </div>
                  <div>
                    <div>
                      Company Email: {selectedJob && selectedJob.owner?.email}
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div> 
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  jobs: selectJobsList(state),
  total: selectTotalJobs(state),
  profile: selectProfile(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchJobs: (skip?: number, limit?: number, language?: string, dateRange?: string) => dispatch(JobActions.fetchJobs(skip, limit, language, dateRange)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
