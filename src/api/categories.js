import apiClient, { API_URL } from './apiClient';

const getAllCategories = (options) => {
    return apiClient
        .get(`${API_URL}api/categories`, options)
        .then((response) => {
            return response.data;
        });
};

const getAvailableCategories = (options) => {
    return apiClient
        .get(`${API_URL}api/available-categories`, options)
        .then((response) => {
            return response.data;
        });
};

const CategoriesService = {
    getAllCategories,
    getAvailableCategories,
}

export default CategoriesService;
