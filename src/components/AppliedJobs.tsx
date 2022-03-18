import React, { useMemo } from 'react';
import { BasicTable } from './shared/BasicTable';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { JobDetails } from './CreateJob';
import { selectProfile } from '../store/auth/duck/selectors';
import { selectJobsList } from '../store/jobs/duck/selectors';
import { RootState } from "MyTypes";
import { connect } from "react-redux";

interface Props {
  jobs: JobDetails[];
  profile: any;
}

const AppliedJobs = ({ jobs, profile}:Props) => {

  const appliedJobs = useMemo(() => {
    if(jobs && profile){
      return jobs.filter((job) => job.applicants.includes(profile?._id))
    }
    return [];
  }, [jobs, profile]);

  return (
    <div className="p-5">
      <BasicTable rowHeaders={["Title", "Location", "Created At", "Updated At"]} rowData={
        
        appliedJobs.length > 0 ? appliedJobs.map((ownedJob: JobDetails) => (
        <TableRow
          key={ownedJob._id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell align="right">{ownedJob.title}</TableCell>
          <TableCell align="right">{ownedJob.location}</TableCell>
          <TableCell align="right">{ownedJob?.createdAt}</TableCell>
          <TableCell align="right">{ownedJob?.updatedAt}</TableCell>
        </TableRow>
      )) : []}/>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  jobs: selectJobsList(state),
  profile: selectProfile(state),
});


export default connect(mapStateToProps, null)(AppliedJobs);