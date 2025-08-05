import axios from "axios";
import { baseURL } from "./endPoint";
import Cookies from "js-cookie";








export const axiosInstance=axios.create({
    baseURL:`${baseURL}`,

})


axiosInstance.interceptors.request.use(
    (config) => {
     
      const cookie = Cookies.get("LOGEDDATA");
const token = cookie ? JSON.parse(cookie).accessToken : undefined;
      if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );





