import React from 'react';
import { Box, Container, Typography } from "@mui/material";

const HomePage = () => {
    return (
        <Container>
            <Box
                className="home-container"
                sx={{
                    minHeight: "80vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box className="home-content">
                    <Typography variant="h4" component="p" sx={{ textAlign: "center" }}>
                        Welcome, user! You are logged in.
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default HomePage;
