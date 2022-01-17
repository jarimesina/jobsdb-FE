import axios from "./axios";

export const login = (email: string, password: string) => axios
  .post("http://localhost:4001/login", {
    email,
    password,
  });

export const signup = (firstName: string, lastName: string, email: string, password: string) => axios.post(
  'http://localhost:4001/register', {
    firstName,
    lastName,
    email,
    password,
  }
);

export const updateCompanyInfo = ( id: string, company_name: string, about: string, benefits: any, image: any, industry: string, numberOfEmployees: any) => axios.post(
  'http://localhost:4001/user', {
    id,
    company_name,
    about,
    benefits,
    image,
    industry,
    numberOfEmployees,
  }
);

export const fetchProfile = () => axios.get('http://localhost:4001/user/me');