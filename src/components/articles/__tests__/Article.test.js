import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Article from "../Article";

const mockArticle = {
    title: "Test Title",
    content: "Test content",
    url: "https://www.example.com",
    category: {
        name: "Test Category",
    },
};

describe("Article component", () => {
    beforeEach(() => {
        render(<Article article={mockArticle} />);
    });

    it("renders the article title", () => {
        const titleElement = screen.getByText(/Test Title/i);
        expect(titleElement).toBeInTheDocument();
    });

    it("renders the article content", () => {
        const contentElement = screen.getByText(/Test content/i);
        expect(contentElement).toBeInTheDocument();
    });

    it("renders the article source URL", () => {
        const sourceElement = screen.getByText(/Source:/i);
        const urlElement = screen.getByRole("link", { name: /www.example.com/i });
        expect(sourceElement).toBeInTheDocument();
        expect(urlElement).toBeInTheDocument();
        expect(urlElement).toHaveAttribute("href", "https://www.example.com");
    });

    it("renders the article category", () => {
        const categoryElement = screen.getByText(/Category: Test Category/i);
        expect(categoryElement).toBeInTheDocument();
    });

    it("renders 'Not available' when category is missing", () => {
        const newMockArticle = { ...mockArticle, category: null };
        render(<Article article={newMockArticle} />);
        const categoryElement = screen.getByText(/Category: Not available/i);
        expect(categoryElement).toBeInTheDocument();
    });
});