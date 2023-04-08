import React from "react";
import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";

import UserService from "../../../api/users";
import CategoriesService from "../../../api/categories";

import NewsFeedSettings from "../NewsFeedSettings";

jest.mock('../../../api/users');
jest.mock('../../../api/categories');
jest.mock('../../../api/apiClient');

const preferencesMock = [
    { id: 1, key: "category", value: "1" },
];

const categoriesMock = [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
];

describe('NewsFeedSettings component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders NewsFeedSettings component", async () => {
        UserService.getPreferences.mockResolvedValue(preferencesMock);
        CategoriesService.getAvailableCategories.mockResolvedValue(categoriesMock);

        await act(async () => {
            render(
                <BrowserRouter>
                    <NewsFeedSettings />
                </BrowserRouter>
            );
        });

        // Use a regular expression to find the element containing the desired text.
        expect(screen.getByText(/Select the categories you want to see on your/)).toBeInTheDocument();
        expect(await screen.findByText("News Feed")).toBeInTheDocument();
    });


    // Add more tests here for submitting the form, updating preferences, and deleting preferences.
});
