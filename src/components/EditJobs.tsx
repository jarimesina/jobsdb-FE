import Button from '@mui/material/Button';
import { RootState } from "MyTypes";
import React, { useState } from "react";
import { connect } from "react-redux";
import { selectUserId } from "../store/auth/duck/selectors";
import { selectJobsList } from "../store/jobs/duck/selectors";
import { JobDetails } from "./CreateJob";
import Modal from '@mui/material/Modal';
import { Cookies } from 'react-cookie';

interface Props{
  jobs: any[];
  userId: string;
}

// const EditJobs: React.FC<Props> = (jobs,userId) => {
const EditJobs: React.FC<Props> = (props) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const cookies = new Cookies();
  const temp = cookies.get('AUTH_KEY');

  // call api to get all jobs associated to that user and put in store

  // console.log("jobs", jobs.jobs);
  const ownedJobs = props?.jobs.filter((job: { owner: string; }) => (job.owner == props?.userId));

  return (
  <div>
    {
      ownedJobs.map((ownedJob: { _id: string; companyName: string; title: string; }) => {
        return (
          <div key={ownedJob._id} className="p-6 bg-gray-300 flex flex-row justify-between">
            <div>
              <div>
                {ownedJob._id}
              </div>
              <div>
                {ownedJob.companyName}
              </div>
              <div>
                {ownedJob.title}
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <div>
                <Button onClick={()=>{setOpenEditModal(true)}} variant="outlined">EDIT</Button>
              </div>
              <div>
                <Button onClick={()=>{setOpenEditModal(true)}} variant="outlined">DELETE</Button>
              </div>
            </div>
          </div>
        );
      })
    }

    <Modal
      open={openEditModal}
      onClose={() => { setOpenEditModal(false)}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2	-translate-x-1/2	w-400 bg-white border-2 border-solid shadow-md p-4">
        <div>
          Text in a modal
        </div>
        <div>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </div>
      </div>
    </Modal>
  </div>);
};

const mapStateToProps = (state: RootState) => ({
  jobs: selectJobsList(state),
  userId: selectUserId(state),
})

export default connect(mapStateToProps)(EditJobs);