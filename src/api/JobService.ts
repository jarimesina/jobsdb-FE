import axios from "axios";

export const fetchJobs = () => {
  return axios.get('http://localhost:4001/jobs');
}