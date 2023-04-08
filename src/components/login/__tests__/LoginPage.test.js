import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../LoginPage';
import AuthService from '../../../api/auth';
import '@testing-library/jest-dom';

jest.mock('../../../api/auth');

describe('LoginPage component', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders login form with email and password inputs and submit button', () => {
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByRole('button', { name: /login/i });

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });

    it('submits the login form with valid inputs', async () => {
        AuthService.login.mockResolvedValue();

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByRole('button', { name: /login/i });

        fireEvent.change(emailInput, { target: { value: 'test_user@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'test_password' } });

        fireEvent.click(loginButton);

        await waitFor(() => expect(AuthService.login).toHaveBeenCalledTimes(1));

        expect(AuthService.login).toHaveBeenCalledWith({
            email: 'test_user@example.com',
            password: 'test_password',
        });
    });

    it('displays error messages when fields are empty and login button is clicked', () => {
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByRole('button', { name: /login/i });

        fireEvent.change(emailInput, { target: { value: ' ' } });
        fireEvent.change(passwordInput, { target: { value: '' } });

        fireEvent.click(loginButton);

        expect(screen.getByText("Email is required")).toBeInTheDocument();
        expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
});
