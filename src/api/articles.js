import apiClient, { API_URL } from './apiClient';

const getArticles = (params) => {
    return apiClient
        .get(`${API_URL}api/articles`, { params })
        .then((response) => {
            return response.data;
        });
};

const ArticleService = {
    getArticles,
}

export default ArticleService;
