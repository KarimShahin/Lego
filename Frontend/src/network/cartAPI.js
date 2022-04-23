import { axiosInstance } from "./axiosConfig";

export const getUserCart = () => {
  return axiosInstance.get(`/cart/`);
};

export const updateUserCart = (data) => {
    return axiosInstance.put(`/cart/UpdateCart`,{
        ...data
    });
  };