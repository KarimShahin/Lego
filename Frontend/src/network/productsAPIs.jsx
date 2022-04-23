import { axiosInstance } from "./axiosConfig";

export const getProductDetails = (id) => {
	return axiosInstance.get(`/shop/${id}`);
};
export const getProductDetailsById = (id) => {
	return axiosInstance.post(`/product`, { id });
};

export const getProduct = (limit, page, filter) => {
	return axiosInstance.get(`/shop`, {
		params: {
			limit: limit,
			page: page,
			filter: filter,
		},
	});
};

export const postProductRating = (rating, _id) => {
	return axiosInstance.put(`/rating`, { rating: rating, _id: _id });
};

export const getAllCategory = () => {
	return axiosInstance.get(`/dashboard/category`);
};
