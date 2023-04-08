import React, { useState, useEffect } from "react";
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import CategoriesService from "../../api/categories";

const SearchAndFilter = ({ onSearchAndFilter }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchAllCategories();
    }, []);

    const fetchAllCategories = async () => {
        CategoriesService.getAllCategories({}).then(
            (response) => {
                setCategories(response);
            },
            (error) => {
                console.error("Error fetching categories:", error);
            }
        );
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearchAndFilter(searchTerm, selectedCategory);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        onSearchAndFilter(searchTerm, e.target.value);
    };

    return (
        <Box className="search-and-filter" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>            <form onSubmit={handleSearchSubmit} data-testid="search-form">
                <TextField
                    data-testid="search-input"
                    type="text"
                    placeholder="Search articles"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    variant="outlined"
                    size="small"
                    sx={{ flex: "1 0 auto" }}
                />
                <Button type="submit" variant="contained" color="primary" size="small" sx={{ marginLeft: "0.5rem" }}>
                    Search
                </Button>
            </form>
            <FormControl variant="outlined" size="small" sx={{ minWidth: "150px" }}>
                <InputLabel htmlFor="category-select">Category</InputLabel>
                <Select
                    data-testid="category-select"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    label="Category"
                    inputProps={{ id: "category-select" }}
                >
                    <MenuItem value="">
                        <em>All categories</em>
                    </MenuItem>
                    {categories.map((category) => (
                        <MenuItem  key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default SearchAndFilter;
