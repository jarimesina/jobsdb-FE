import { connect } from 'react-redux';
import { RootState } from 'MyTypes';
import React from 'react';
import { selectProfile } from '../store/auth/duck/selectors';
import { BasicTable } from './shared/BasicTable';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';

interface Props{
  profile: any;
}

// a component that displays a users saved jobs
const SavedJobs: React.FC<Props> = ({profile}) => {

  return (
    <div className="p-5">
      <BasicTable
        rowHeaders={["ID", "Company Name", "Title", "Location", "Number of Employees", "Actions"]} 
        rowData={profile?.info?.saved_jobs.map((ownedJob: any) => (
        <TableRow
          key={ownedJob._id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row" align="right">
            {ownedJob._id}
          </TableCell>
          <TableCell align="right">{ownedJob.companyName}</TableCell>
          <TableCell align="right">{ownedJob.title}</TableCell>
          <TableCell align="right">{ownedJob.location}</TableCell>
          <TableCell align="right">{ownedJob.numberOfEmployees}</TableCell>
          <TableCell align="right">
            <div className="flex space-x-1 justify-end">
              <Button onClick={()=>{
                  // TODO: add remove job
                }} variant="outlined" color="error">REMOVE</Button>
            </div>
          </TableCell>
        </TableRow>
      ))}/>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  profile: selectProfile(state),
});

export default connect(mapStateToProps, null)(SavedJobs);