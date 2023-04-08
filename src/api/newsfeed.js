import apiClient, { API_URL } from './apiClient';

const getArticles = (params) => {
    return apiClient
        .get(`${API_URL}api/newsfeed`, { params })
        .then((response) => {
            return response.data;
        });
};

const NewsFeedService = {
    getArticles,
}

export default NewsFeedService;
