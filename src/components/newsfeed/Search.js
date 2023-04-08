import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {}, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <Box
            className="search-and-filter"
            sx={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <form onSubmit={handleSearchSubmit} data-testid="search-form">
                <TextField
                    data-testid="search-input"
                    variant="outlined"
                    placeholder="Search articles"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    size={"small"}
                    sx={{ marginRight: "1rem" }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    size={"small"}
                    onClick={handleSearchSubmit}
                >
                    Search
                </Button>
            </form>
        </Box>
    );
};

export default Search;
