import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';

import UserService from "../../../api/users";
import AccountSettings from "../AccountSettings";
import {BrowserRouter} from "react-router-dom";

jest.mock('../../../api/users');
jest.mock('../../../api/apiClient');

describe('AccountSettings component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders AccountSettings component and checks user details", async () => {
        const userDetailsMock = { name: "John Doe" };

        UserService.getUserDetails.mockResolvedValue(userDetailsMock);

        render(
            <BrowserRouter>
                <AccountSettings />
            </BrowserRouter>
        );

        expect(await screen.findByText("Account Settings")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByLabelText(/Name/i)).toHaveValue(userDetailsMock.name);
        });
    });

    it("fetchUserDetails should log error on failure", async () => {
        UserService.getUserDetails.mockRejectedValue(new Error("Error fetching user details"));

        // Spy on console.error to check if the error is logged
        const consoleSpy = jest.spyOn(console, "error");
        consoleSpy.mockImplementation(() => {});

        render(<AccountSettings />);

        await waitFor(() => expect(consoleSpy).toHaveBeenCalledTimes(1));

        // Clean up the mock implementation
        consoleSpy.mockRestore();
    });
});
