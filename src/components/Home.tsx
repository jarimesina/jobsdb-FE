import { RootState } from "MyTypes";
import React, { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import * as JobActions from '../store/jobs/duck/actions';
import { selectJobsList } from "../store/jobs/duck/selectors";
import { JobDetails } from "./CreateJob";

interface Props {
  jobs: JobDetails[];
  // jobs: any;
  fetchJobs: () => void;
}

const Home = ({
  jobs,
  fetchJobs
}: Props) => {
  useEffect(() => {
    fetchJobs()
  }, [fetchJobs]);

  return (
    <div className="flex flex-row mx-2">
      <div className="w-4/12 flex flex-col">
        {
          jobs?.map((job: JobDetails,idx: any)=>{
            return (
            <div key={idx}>
              <h1>{job.title}</h1>
              <h2>{job.companyName}</h2>
              <h2>{job.location}</h2>
            </div>)
          })
        }
      </div>
      <div className="w-8/12 bg-red-500 h-screen">
        
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  jobs: selectJobsList(state)
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchJobs: () => dispatch(JobActions.fetchJobs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
