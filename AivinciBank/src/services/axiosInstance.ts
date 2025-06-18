import axios from "axios";


const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, 
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        const refreshToken = localStorage.getItem("refreshToken");
        const userId = localStorage.getItem("userId");
  
        if (!refreshToken || !userId) {
          return Promise.reject(error);
        }
  
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/refresh`,
            { userId, refreshToken }
          );
  
          const newAccessToken = response.data.accessToken;
  
          localStorage.setItem("accessToken", newAccessToken);
  
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
  
          return axiosInstance(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }
  
      return Promise.reject(error);
    }
  );
export default axiosInstance;
