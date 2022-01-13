import axios from "./axios";

export const fetchJobs = (skip?: number, limit?: number) => {
  return axios.get(`http://localhost:4001/jobs?skip=${skip || 0}&limit=${limit || 0}`);
}

export const createJob = (values: any) => {
  return axios.post('http://localhost:4001/job', values);
}

export const editJob = (values: any) => {
  return axios.put('http://localhost:4001/job', values);
}

export const deleteJob = (values: any) => {
  return axios.delete('http://localhost:4001/job', values);
}