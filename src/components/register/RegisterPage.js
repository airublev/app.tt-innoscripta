import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, FormControl, FormHelperText, InputLabel, OutlinedInput, Typography } from "@mui/material";

import AuthService from "../../api/auth";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: "" });
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        };

        if (!formData.name) {
            newErrors.name = "Name is required";
            valid = false;
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            valid = false;
        }

        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = "Passwords do not match";
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
            AuthService.register(formData).then(
                (response) => {
                    if(response){
                        console.log('Registration successful:', response);
                        navigate("/login");
                    }
                },
                (error) => {
                    console.error('Registration failed:', error);
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
            <Box className="register-page" sx={{ marginTop: "2rem" }}>
                <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
                    Register Form
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl
                        variant="outlined"
                        fullWidth
                        error={Boolean(errors.name)}
                        sx={{ marginBottom: "1rem" }}
                    >
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <OutlinedInput
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            label="Name"
                        />
                        {errors.name && (
                            <FormHelperText>{errors.name}</FormHelperText>
                        )}
                    </FormControl>

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
                            value={formData.email}
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
                            value={formData.password}
                            onChange={handleChange}
                            label="Password"
                        />
                        {errors.password && (
                            <FormHelperText>{errors.password}</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl
                        variant="outlined"
                        fullWidth
                        error={Boolean(errors.password_confirmation)}
                        sx={{ marginBottom: "1rem" }}
                    >
                        <InputLabel htmlFor="password_confirmation">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            label="Confirm Password"
                        />
                        {errors.password_confirmation && (
                            <FormHelperText>{errors.password_confirmation}</FormHelperText>
                        )}
                    </FormControl>

                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Register
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

export default RegisterPage;
