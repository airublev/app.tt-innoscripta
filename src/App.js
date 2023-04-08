import React, { useState, useEffect } from "react";
import { Link, useNavigate, useRoutes, Navigate } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

import AuthService from "./api/auth";
import LoginForm from './components/login/LoginPage';
import RegisterForm from './components/register/RegisterPage';
import HomePage from './components/home/HomePage';
import NewsFeedPage from "./components/newsfeed/NewsFeedPage";
import PreferencesPage from "./components/preferences/PreferencesPage";
import ArticlePage from "./components/articles/ArticlePage";

const App = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);
    const isAuth = localStorage.getItem('isAuth');

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, [isAuth, navigate]);

    const logOut = async (event) => {
        event.preventDefault();

        try {
            await AuthService.logout();
            setCurrentUser(undefined);
            navigate("/login");
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const routes = useRoutes([
        {
            path: "/",
            element: isAuth ? <HomePage /> : <Navigate to="/login" />,
        },
        {
            path: "/newsfeed",
            element: isAuth ? <NewsFeedPage /> : <Navigate to="/login" />,
        },
        {
            path: "/articles",
            element: isAuth ? <ArticlePage /> : <Navigate to="/login" />,
        },
        {
            path: "/preferences",
            element: isAuth ? <PreferencesPage /> : <Navigate to="/login" />,
        },
        {
            path: "/login",
            element: !isAuth ? <LoginForm /> : <Navigate to="/" />,
        },
        {
            path: "/register",
            element: !isAuth ? <RegisterForm /> : <Navigate to="/" />,
        },
    ]);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        My App
                    </Typography>
                    {currentUser ? (
                        <Box>
                            <Button color="inherit" href="/newsfeed">
                                Home
                            </Button>
                            <Button color="inherit" href="/newsfeed">
                                News Feed
                            </Button>
                            <Button color="inherit" href="/articles">
                                Articles
                            </Button>
                            <Button color="inherit" href="/preferences">
                                Preferences
                            </Button>
                            <Button color="inherit" onClick={logOut}>
                                Logout
                            </Button>
                        </Box>
                    ) : (
                        <Box>
                            <Button color="inherit" href="/login">
                                Login
                            </Button>
                            <Button color="inherit" href="/register">
                                Sign Up
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            <Container sx={{ marginTop: "3rem" }}>{routes}</Container>
        </div>
    );
};

export default App;