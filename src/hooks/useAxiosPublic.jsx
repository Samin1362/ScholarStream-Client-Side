import axios from "axios";

// Public axios instance for endpoints that don't require authentication
const axiosPublic = axios.create({
  baseURL: "http://localhost:3001/",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
