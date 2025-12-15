import axios from "axios";

// Public axios instance for endpoints that don't require authentication
const axiosPublic = axios.create({
  baseURL: "https://scholar-stream-server-side.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
