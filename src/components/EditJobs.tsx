import Button from '@mui/material/Button';
import { RootState } from "MyTypes";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { selectProfile, selectUserId } from "../store/auth/duck/selectors";
import { selectJobsList } from "../store/jobs/duck/selectors";
import Modal from '@mui/material/Modal';
import { TextField, TextareaAutosize, FormLabel } from '@material-ui/core';
import { Formik } from 'formik';
import { BasicTable } from './shared/BasicTable';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import * as JobService from '../api/JobService';
import * as JobActions from '../store/jobs/duck/actions';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { JobDetails } from './CreateJob';
import { useSnackbar } from '../contexts/SnackbarContext';

interface Props{
  jobs: any[];
  userId: string;
  profile: any;
}

// TODO: add the other fields that need to be editted
// const EditJobs: React.FC<Props> = (jobs,userId) => {
const EditJobs: React.FC<Props> = ({jobs, userId, profile}) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [ownedJobs, setOwnedJobs] = useState(null);
  const { show } = useSnackbar();

  const getOwnedJobs = async () => {
    try {
      const temp = await JobService.fetchCreatedJobs(profile?._id);
      setOwnedJobs(temp);
    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{

    if(profile){
      console.log('profile', profile);
      getOwnedJobs();
    }

  }, [profile]);


  const handleSubmit = async (values: any) => {
    try{
      await JobService.editJob({...values, _id: selectedJob._id});
      show({message: 'Job editted successfully', status: 'success'})
    }
    catch(err){
      show({message: 'Failed to edit a job', status: 'error'})
    }
    finally{
      setOpenEditModal(false);
    }
  }

  return (
    <div className="p-10">
      {
        ownedJobs && (
          <BasicTable rowHeaders={["Title", "Location", "Created At", "Updated At", "Actions"]} rowData={ownedJobs.data.data.map((ownedJob: JobDetails) => (
            <TableRow
              key={ownedJob._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{ownedJob.title}</TableCell>
              <TableCell align="right">{ownedJob.location}</TableCell>
              <TableCell align="right">{ownedJob?.createdAt}</TableCell>
              <TableCell align="right">{ownedJob?.updatedAt}</TableCell>
              <TableCell align="right">
                <div className="flex space-x-1 justify-end">
                  <Button onClick={() => {
                      setSelectedJob(ownedJob);
                      setOpenEditModal(true);
                    }} variant="outlined">EDIT</Button>
                  <Button onClick={()=>{
                      setSelectedJob(ownedJob);
                      setOpenDeleteModal(true);
                    }} variant="outlined" color="error">DELETE</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}/>
        )
      }

      <Modal
        open={openDeleteModal}
        onClose={() => { setOpenDeleteModal(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/4 left-0 right-0 mx-auto	w-96 bg-white border-2 border-solid shadow-md p-4">
          <div className="flex flex-col mb-3">
            Are you sure?
          </div>

          <Button onClick={async () => {
            try{
              const res = await JobService.deleteJob(selectedJob._id);

              if(res.status === 200){
                show({message: 'Successfully deleted job', status: 'success'})
              }
            }
            catch(err){
              show({message: 'Failed to delete job', status: 'error'})
            }
            finally{
              setOpenDeleteModal(false);
            }
          }}>Yes</Button>
          <Button onClick={() => {
            setOpenDeleteModal(false);
          }}>Cancel</Button>

        </div>
      </Modal>
      <Modal
        open={openEditModal}
        onClose={() => { setOpenEditModal(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/4 left-0 right-0 mx-auto	w-96 bg-white border-2 border-solid shadow-md p-4">
          <Formik
            // validator={null}
            initialValues={{
              _id: "",
              title: selectedJob?.title,
              responsibilities: selectedJob?.responsibilities,
              location: selectedJob?.location,
            }}
            onSubmit={handleSubmit}
          >
            {({values, handleSubmit, handleChange, handleBlur}: {values: any, handleSubmit: any,handleChange: any, handleBlur: any }) => {
              
              return (
                <>
                  <div>Edit Form</div>
                  <div className="flex flex-col mb-3 mt-2">
                    <FormLabel>Title</FormLabel>
                    <TextField name="title" id="title" variant="outlined" size="small"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                    />
                  </div>

                  <div className="flex flex-col mb-3">
                    <FormLabel>Location</FormLabel>
                    <TextField name="location" id="location" variant="outlined" size="small"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.location}
                    />
                  </div>

                  <div className="flex flex-col mb-3">
                    <FormLabel>Responsibilities</FormLabel>
                    <TextareaAutosize 
                      maxRows={4}
                      name="responsibilities"
                      id="responsibilities"
                      value={values.responsibilities}
                      className="border border-solid border-gray"
                    />
                  </div>

                  <Button onClick={handleSubmit}>Submit</Button>
                </>
              );
            }}
          </Formik>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  jobs: selectJobsList(state),
  userId: selectUserId(state),
  profile: selectProfile(state),
});


export default connect(mapStateToProps, null)(EditJobs);