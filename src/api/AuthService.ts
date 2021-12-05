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