import axios from "./axios";

export const fetchJobs = () => {
  return axios.get('http://localhost:4001/jobs');
}

export const editJob = (values: any) => {
  return axios.put('http://localhost:4001/job', values);
}

export const deleteJob = (values: any) => {
  return axios.delete('http://localhost:4001/job', values);
}