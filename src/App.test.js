import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { act } from 'react-dom/test-utils';

import AuthService from "./api/auth";
import App from "./App";

jest.mock("./api/apiClient");
jest.mock("./api/auth");

describe('App component', function () {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders App component with login and register buttons when not authenticated", () => {
        localStorage.removeItem("user");
        localStorage.removeItem("isAuth");

        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        const links = screen.getAllByRole("link");

        const loginButton = links.find((link) => link.getAttribute("href") === "/login");
        expect(loginButton).toBeInTheDocument();

        const registerButton = links.find((link) => link.getAttribute("href") === "/register");
        expect(registerButton).toBeInTheDocument();
    });

    it("renders App component with navigation buttons when authenticated", () => {
        localStorage.setItem("isAuth", "true");
        AuthService.getCurrentUser.mockReturnValue({ username: "test_user" });

        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("News Feed")).toBeInTheDocument();
        expect(screen.getByText("Articles")).toBeInTheDocument();
        expect(screen.getByText("Preferences")).toBeInTheDocument();
        expect(screen.getByText("Logout")).toBeInTheDocument();
    });

    it("logs out user and navigates to login page when logout button is clicked", async () => {
        localStorage.setItem("isAuth", "true");
        AuthService.getCurrentUser.mockReturnValue({ username: "test_user" });
        AuthService.logout.mockResolvedValue();

        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        const logoutButton = screen.getByText(/Logout/i);
        await act(async () => {
            fireEvent.click(logoutButton);
        });

        expect(AuthService.logout).toHaveBeenCalled();
    });

});
