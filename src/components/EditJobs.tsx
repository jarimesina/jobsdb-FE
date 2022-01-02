import Button from '@mui/material/Button';
import { RootState } from "MyTypes";
import React, { Dispatch, useEffect, useState } from "react";
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
import { EMPLOYEE_COUNT } from './CreateJob';

interface Props{
  jobs: any[];
  userId: string;
  profile: any;
  fetchJobs: () => void;
}

// const EditJobs: React.FC<Props> = (jobs,userId) => {
const EditJobs: React.FC<Props> = (props) => {
  const [openEditModal, setOpenEditModal] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(()=>{
    if(props?.fetchJobs){
      props.fetchJobs();
    }
  }, [props?.fetchJobs]);

  // call api to get all jobs associated to that user and put in store
  const ownedJobs = props?.jobs.filter((job: { owner: string; }) => (job.owner == props?.profile?._id));

  return (
    <div className="p-10">
      <BasicTable rowHeaders={["ID", "Company Name", "Title", "Location", "Number of Employees", "Actions"]} rowData={ownedJobs.map((ownedJob) => (
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
              window.alert("Successfully deleted job.");
              await JobService.deleteJob(selectedJob._id);
            }
            catch(err){
              window.alert("Error in deleting job.");
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
              companyName: selectedJob?.companyName,
              location: selectedJob?.location,
              numberOfEmployees: selectedJob?.numberOfEmployees,
            }}
            onSubmit={async (values) => {
              try{
                await JobService.editJob({...values, _id: selectedJob._id});
                window.alert("Successfully editted job.");
              }
              catch(err){
                window.alert("Error in editting job.");
              }
              finally{
                setOpenEditModal(false);
              }
            }}
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
                    {/* <FormLabel>Number of Employees</FormLabel>
                    <TextField name="numberOfEmployees" id="numberOfEmployees" variant="outlined" size="small"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.numberOfEmployees}
                    /> */}
                    <div className="">
                      <FormControl fullWidth variant="standard">
                        <InputLabel id="demo-simple-select-label">Number of Employees</InputLabel>
                        <Select
                          name="numberOfEmployees" id="numberOfEmployees"
                          value={values.numberOfEmployees}
                          label="Number of Employees"
                          onChange={handleChange}
                        >
                          {EMPLOYEE_COUNT.map(number => (
                            <MenuItem value={number.value} key={number.name}>{number.value}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>

                  <div className="flex flex-col mb-3">
                    <FormLabel>Responsibilities</FormLabel>
                    <TextareaAutosize 
                      maxRows={4}
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

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fetchJobs: () => dispatch(JobActions.fetchJobs()),    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditJobs);