import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

const errorHandler = (error: AxiosError) => {
  const statusCode = error.response?.status;

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});

export default api;
