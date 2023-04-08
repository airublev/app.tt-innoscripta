import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, FormControl, FormHelperText, InputLabel, OutlinedInput, Typography } from "@mui/material";

import AuthService from "../../api/auth";

const required = (value) => {
    if (!value) {
        return (
            <div className="invalid-feedback d-block">
                This field is required!
            </div>
        );
    }
};

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });

    const navigate = useNavigate();

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: "" });
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = { email: "", password: "" };

        if (!credentials.email) {
            newErrors.email = "Email is required";
            valid = false;
        }

        if (!credentials.password) {
            newErrors.password = "Password is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setLoading(true);

        if (validateForm()) {
            AuthService.login(credentials).then(
                (response) => {
                    navigate("/");
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box className="login-form-container" sx={{ marginTop: "2rem" }}>
                <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
                    Login Form
                </Typography>
                <form onSubmit={handleSubmit} className="login-form">
                    <FormControl
                        variant="outlined"
                        fullWidth
                        error={Boolean(errors.email)}
                        sx={{ marginBottom: "1rem" }}
                    >
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput
                            id="email"
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            label="Email"
                        />
                        {errors.email && (
                            <FormHelperText>{errors.email}</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl
                        variant="outlined"
                        fullWidth
                        error={Boolean(errors.password)}
                        sx={{ marginBottom: "1rem" }}
                    >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            label="Password"
                        />
                        {errors.password && (
                            <FormHelperText>{errors.password}</FormHelperText>
                        )}
                    </FormControl>

                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Login
                    </Button>
                </form>
                {loading && (
                    <Typography sx={{ marginTop: "1rem" }}>Loading...</Typography>
                )}
                {message && (
                    <Typography color="error" sx={{ marginTop: "1rem" }}>
                        {message}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default LoginPage;