import axios from "./axios";

export const fetchJobs = (skip?: number, limit?: number, language?: string, dateRange?: string) => {
  return axios.get(`http://localhost:4001/jobs?skip=${skip || 0}&limit=${limit || 0}&programmingLanguage=${language}&dateRange=${dateRange}`);
}

export const createJob = (values: any) => {
  return axios.post('http://localhost:4001/job', values);
}

export const editJob = (values: any) => {
  return axios.put('http://localhost:4001/job', values);
}

export const deleteJob = (id: string) => {
  return axios.delete('http://localhost:4001/job', { data: { id } });
}

export const fetchCreatedJobs = (id: string) => {
  return axios.get(`http://localhost:4001/myJobs?id=${id}`);
}

export const applyJob = (toEmail: string, jobId: string, userId: string) => {
  return axios.post(`http://localhost:4001/applyJob`, { toEmail, jobId, userId });
}