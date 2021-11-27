import axios from "./axios";

export const login = (email: string, password: string) => axios
  .post("http://localhost:4001/login", {
    email,
    password,
  });
