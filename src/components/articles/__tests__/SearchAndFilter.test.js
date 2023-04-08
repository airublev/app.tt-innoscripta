import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchAndFilter from "../SearchAndFilter";

// Mock the CategoriesService to prevent API calls
jest.mock("../../../api/categories", () => ({
    getAllCategories: () =>
        Promise.resolve([
            { id: "1", name: "Category 1" },
            { id: "2", name: "Category 2" },
        ]),
}));

describe("SearchAndFilter component", () => {
    it("renders and handles search input change", async () => {
        const handleSearchAndFilter = jest.fn();

        await waitFor(() => render(<SearchAndFilter onSearchAndFilter={handleSearchAndFilter} />));

        const searchInput = screen.getByTestId("search-input");
        const inputElement = searchInput.querySelector("input");
        await userEvent.type(inputElement, "test search");

        expect(inputElement.value).toBe("test search");
    });

    it("search form submits correctly", async () => {
        const handleSearchAndFilter = jest.fn();

        await waitFor(() => render(<SearchAndFilter onSearchAndFilter={handleSearchAndFilter} />));

        const searchInput = screen.getByTestId("search-input");
        const searchForm = screen.getByTestId("search-form");
        const inputElement = searchInput.querySelector("input");

        await userEvent.type(inputElement, "test search");
        fireEvent.submit(searchForm);

        expect(handleSearchAndFilter).toHaveBeenCalledWith("test search", "");
    });
});
