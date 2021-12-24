import Button from '@mui/material/Button';
import { RootState } from "MyTypes";
import React, { Dispatch, useEffect, useState } from "react";
import { connect } from "react-redux";
import { selectProfile, selectUserId } from "../store/auth/duck/selectors";
import { selectJobsList } from "../store/jobs/duck/selectors";
import { JobDetails } from "./CreateJob";
import Modal from '@mui/material/Modal';
import { Cookies } from 'react-cookie';
import * as AuthActions from '../store/auth/duck/actions';
import { TextField, TextareaAutosize, FormLabel } from '@material-ui/core';
import { Formik } from 'formik';
import { BasicTable } from './shared/BasicTable';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

interface Props{
  jobs: any[];
  userId: string;
  fetchProfile: () => void;
  profile: any;
}

// const EditJobs: React.FC<Props> = (jobs,userId) => {
const EditJobs: React.FC<Props> = (props) => {
  const [openEditModal, setOpenEditModal] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(()=>{
    if(props.fetchProfile){
      props.fetchProfile();
    }
  }, [props?.fetchProfile, ]);

  // call api to get all jobs associated to that user and put in store
  const ownedJobs = props?.jobs.filter((job: { owner: string; }) => (job.owner == props?.profile?._id));

  return (
  <>
    <BasicTable rowHeaders={["ID", "Company Name", "Title", "Actions"]} rowData={ownedJobs.map((ownedJob) => (
      <TableRow
        key={ownedJob._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row" align="right">
          {ownedJob._id}
        </TableCell>
        <TableCell align="right">{ownedJob.companyName}</TableCell>
        <TableCell align="right">{ownedJob.title}</TableCell>
        <TableCell align="right">
          <div className="flex space-x-1">
            <Button onClick={() => {
                setSelectedJob(ownedJob);
                setOpenEditModal(true);
              }} variant="outlined">EDIT</Button>
            <Button onClick={()=>{setOpenEditModal(true)}} variant="outlined" color="error">DELETE</Button>
          </div>
        </TableCell>
      </TableRow>
    ))}/>
    <Modal
      open={openEditModal}
      onClose={() => { setOpenEditModal(false)}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="absolute top-1/2 left-0 right-0 mx-auto	w-96 bg-white border-2 border-solid shadow-md p-4">
        <Formik
          validator={null}
          initialValues={{
            title: selectedJob?.title,
            responsibilities: selectedJob?.responsibilities,
          }}
          onSubmit={null}
        >
          {({values, handleSubmit, handleChange, handleBlur}: {values: any, handleSubmit: any,handleChange: any, handleBlur: any }) => {
            
            return (
              <>
                <FormLabel>Title</FormLabel>

                <TextField name="title" id="title" variant="outlined" size="small"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />

                <FormLabel>Responsibilities</FormLabel>
                <TextareaAutosize 
                  maxRows={4}
                  value={values.responsibilities}
                  className="border border-solid border-gray"
                />
              </>
            );
          }}
        </Formik>
      </div>
    </Modal>
  </>);
};

const mapStateToProps = (state: RootState) => ({
  jobs: selectJobsList(state),
  userId: selectUserId(state),
  profile: selectProfile(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fetchProfile: () => dispatch(AuthActions.fetchProfile()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditJobs);