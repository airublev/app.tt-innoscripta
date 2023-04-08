import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Typography, Link as MuiLink } from "@mui/material";

import UserService from "../../api/users";
import CategoriesService from "../../api/categories";

const NewsFeedSettings = () => {
    const [preferences, setPreferences] = useState([]);
    const [value, setValue] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchPreferences();
        fetchAllCategories();
    }, []);

    const fetchPreferences = async () => {
        try {
            const preferences = await UserService.getPreferences();
            setPreferences(preferences);
        } catch (error) {
            console.error('Error fetching preferences:', error);
        }
    };

    const fetchAllCategories = async () => {
        CategoriesService.getAvailableCategories({}).then(
            (response) => {
                setCategories(response);
            },
            (error) => {
                console.error("Error fetching categories:", error);
            }
        );
    };

    const handleCategoryChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const preference = { key: 'category', value: value };

        if (editingId) {
            await UserService.updatePreferences(editingId, preference);
            setEditingId(null);
        } else {
            await UserService.createPreferences(preference);
        }

        setValue('');
        fetchPreferences();
        fetchAllCategories();
    };

    const handleDelete = async (id) => {
        await UserService.deletePreferences(id);
        fetchPreferences();
        fetchAllCategories();
    };

    return (
        <Container>
            <Box className="user-preferences" sx={{ marginTop: "2rem" }}>
                <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                    Select the categories you want to see on your{" "}
                    <Link component={MuiLink} to="/newsfeed">
                        News Feed
                    </Link>{" "}
                    page
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
                        <InputLabel htmlFor="category-select">Category</InputLabel>
                        <Select
                            value={value}
                            onChange={handleCategoryChange}
                            label="Category"
                            inputProps={{ id: "category-select" }}
                        >
                            <MenuItem value="">All categories</MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category.name} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        {editingId ? "Update" : "Add"}
                    </Button>
                </form>
                <Box component="ul" sx={{ marginTop: "1rem" }}>
                    {preferences.map((preference) => (
                        <Box
                            component="li"
                            key={preference.id}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "0.5rem",
                            }}
                        >
                            <Typography>{preference.key}: {preference.value}</Typography>
                            <Box>
                                {/*<Button onClick={() => handleEdit(preference.id)}>Edit</Button>*/}
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete(preference.id)}
                                    sx={{ marginLeft: "0.5rem" }}
                                >
                                    Delete
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Container>
    );
};

export default NewsFeedSettings;
