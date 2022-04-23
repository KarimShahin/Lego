import { axiosInstance } from "./axiosConfig";

export const getOrder = () => {
  return axiosInstance.get(`/userOrder`);
};


