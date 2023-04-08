import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterPage from '../RegisterPage';
import AuthService from '../../../api/auth';
import '@testing-library/jest-dom';

jest.mock('../../../api/auth');

describe('RegisterPage component', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <RegisterPage />
            </BrowserRouter>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders register form with name, email, password, and confirm password inputs and submit button', () => {
        const nameInput = screen.getByLabelText(/name/i);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInputs = screen.getAllByLabelText(/password/i);
        const passwordInput = passwordInputs[0];
        const confirmPasswordInput = passwordInputs[1];
        const registerButton = screen.getByRole('button', { name: /register/i });

        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(confirmPasswordInput).toBeInTheDocument();
        expect(registerButton).toBeInTheDocument();
    });

    it('submits the register form with valid inputs', async () => {
        AuthService.register.mockResolvedValue();

        const nameInput = screen.getByLabelText(/name/i);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInputs = screen.getAllByLabelText(/password/i);
        const passwordInput = passwordInputs[0];
        const confirmPasswordInput = passwordInputs[1];
        const registerButton = screen.getByRole('button', { name: /register/i });

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john_doe@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'test_password' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'test_password' } });

        fireEvent.click(registerButton);

        await waitFor(() => expect(AuthService.register).toHaveBeenCalledTimes(1));

        expect(AuthService.register).toHaveBeenCalledWith({
            name: 'John Doe',
            email: 'john_doe@example.com',
            password: 'test_password',
            password_confirmation: 'test_password',
        });
    });

    it('displays error messages when fields are empty and register button is clicked', () => {
        const nameInput = screen.getByLabelText(/name/i);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInputs = screen.getAllByLabelText(/password/i);
        const passwordInput = passwordInputs[0];
        const confirmPasswordInput = passwordInputs[1];
        const registerButton = screen.getByRole('button', { name: /register/i });

        fireEvent.change(nameInput, { target: { value: '' } });
        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: '' } });
        fireEvent.change(confirmPasswordInput, { target: { value: '' } });

        fireEvent.click(registerButton);

        expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
    //
    // it('displays error message when passwords do not match and register button is clicked', () => {
    //     const passwordInput = screen.getByLabelText(/password/i);
    //     const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    //     const registerButton = screen.getByRole('button', { name: /register/i });
    //
    //     fireEvent.change(passwordInput, { target: { value: 'test_password' } });
    //     fireEvent.change(confirmPasswordInput, { target: { value: 'another_password' } });
    //     fireEvent.click(registerButton);
    //
    //     expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    // });
});