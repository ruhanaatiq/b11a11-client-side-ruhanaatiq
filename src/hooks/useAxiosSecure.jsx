import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useAxiosSecure = () => {
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  axiosSecure.interceptors.request.use((config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          localStorage.removeItem("access-token");
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
