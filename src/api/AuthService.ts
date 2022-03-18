import axios from "./axios";

export const login = (email: string, password: string) => axios
  .post("http://localhost:4001/login", {
    email,
    password,
  });

export const signup = (firstName: string, lastName: string, email: string, password: string, isEmployer: number) => axios.post(
  'http://localhost:4001/register', {
    firstName,
    lastName,
    email,
    password,
    isEmployer
  }
);

export const updateCompanyInfo = ( id: string, companyName: string, about: string, benefits: any, image: any, industry: string, numberOfEmployees: any) => axios.post(
  'http://localhost:4001/user', {
    id,
    company_name: companyName,
    about,
    benefits,
    image,
    industry,
    numberOfEmployees,
  }
);

export const saveJob = ( jobId: string, userId: string) => axios.post(`http://localhost:4001/saveJob?jobId=${jobId}&userId=${userId}`);

export const fetchProfile = () => axios.get('http://localhost:4001/user/me');

export const updateNormalUser = (id: string, firstName: string, lastName: string, image:string) => axios.post('http://localhost:4001/normalUser', {
  id,
  first_name: firstName,
  last_name: lastName,
  image
});

export const removeSavedJob = (jobId: string, userId: string) => axios.post(`http://localhost:4001/removeSavedJob?jobId=${jobId}&userId=${userId}`);