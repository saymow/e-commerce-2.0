import axios from "axios";

const localApi = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default localApi;
