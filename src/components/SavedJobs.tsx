import { connect } from 'react-redux';
import { RootState } from 'MyTypes';
import React from 'react';
import { selectProfile } from '../store/auth/duck/selectors';
import { BasicTable } from './shared/BasicTable';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import { Dispatch } from 'redux';
import * as AuthActions from '../store/auth/duck/actions';

interface Props{
  profile: any;
  removeSavedJob: (userId: string, jobId: string) => void;
}

// a component that displays a users saved jobs
const SavedJobs: React.FC<Props> = ({profile, removeSavedJob}) => {

  console.log('profile', profile);
  return (
    <div className="p-5">
      <BasicTable
        rowHeaders={["ID", "Company Name", "Title", "Location", "Number of Employees", "Actions"]} 
        rowData={profile?.info?.saved_jobs.length ? profile?.info?.saved_jobs.map((job: any, index: number) => (
        <TableRow
          key={`${job._id}-${index}`}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row" align="right">
            {job._id}
          </TableCell>
          <TableCell align="right">{job?.owner?.info?.company_name}</TableCell>
          <TableCell align="right">{job?.title}</TableCell>
          <TableCell align="right">{job.location}</TableCell>
          <TableCell align="right">{job.numberOfEmployees}</TableCell>
          <TableCell align="right">
            <div className="flex space-x-1 justify-end">
              <Button onClick={()=> {
                removeSavedJob(profile._id, job._id)
                }} variant="outlined" color="error">REMOVE</Button>
            </div>
          </TableCell>
        </TableRow>
      )) : []}/>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  profile: selectProfile(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeSavedJob: (userId: string, jobId: string) => dispatch(AuthActions.removeSavedJob(userId, jobId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedJobs);