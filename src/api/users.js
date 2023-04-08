import apiClient, { API_URL } from './apiClient';

const getPreferences = (options) => {
    return apiClient
        .get(`${API_URL}api/user/preferences`, options)
        .then((response) => {
            return response.data;
        });
};

const createPreferences = (options) => {
    return apiClient
        .post(`${API_URL}api/user/preferences`, options)
        .then((response) => {
            return response.data;
        });
};

const updatePreferences = (id, options) => {
    return apiClient
        .put(`${API_URL}api/user/preferences/`+id, options)
        .then((response) => {
            return response.data;
        });
};

const deletePreferences = (id) => {
    return apiClient
        .delete(`${API_URL}api/user/preferences/`+id)
        .then((response) => {
            return response.data;
        });
};

const getUserDetails = () => {
    return apiClient
        .get(`${API_URL}api/user/details`)
        .then((response) => {
            return response.data;
        });
};

const updateUserDetails = (user) => {
    return apiClient
        .put(`${API_URL}api/user/details`, user)
        .then((response) => {
            return response.data;
        });
};

const changePassword = (currentPassword, newPassword) => {
    return apiClient
        .put(`${API_URL}api/user/change-password`, {
            current_password: currentPassword,
            new_password: newPassword,
            new_password_confirmation: newPassword,
        })
        .then((response) => {
            return response.data;
        });
};

const UserService = {
    getPreferences,
    createPreferences,
    updatePreferences,
    deletePreferences,
    getUserDetails,
    updateUserDetails,
    changePassword
}

export default UserService;
