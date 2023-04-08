import apiClient, { API_URL } from './apiClient';

const register = (user) => {
    return apiClient.post(`${API_URL}register`, user).then((response) => {
        return response.data;
    });
};

const login = (credentials) => {
    return apiClient
        .post(`${API_URL}login`, credentials)
        .then((response) => {

            localStorage.setItem("user", JSON.stringify(response.data));
            localStorage.setItem("isAuth", true);

            return response.data;
        }).catch((error) => {
            if (error.response && error.response.status === 419) {
                window.location.reload();
            } else {
                throw error;
            }
        });
};

const logout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("isAuth");

    return apiClient.post(`${API_URL}logout`)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            if (error.response && error.response.status === 419) {
                window.location.reload();
            } else {
                throw error;
            }
        });
};

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default AuthService;
