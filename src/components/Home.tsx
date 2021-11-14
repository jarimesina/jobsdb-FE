import { RootState } from "MyTypes";
import React, { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import * as JobActions from '../store/jobs/duck/actions';
import { selectJobsList } from "../store/jobs/duck/selectors";
import { JobDetails } from "./CreateJob";

interface Props {
  jobs: JobDetails[];
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
  );
};

const mapStateToProps = (state: RootState) => ({
  jobs: selectJobsList(state)
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchJobs: () => dispatch(JobActions.fetchJobs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
