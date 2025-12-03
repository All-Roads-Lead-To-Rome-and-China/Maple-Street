import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CustomerRegistrationForm from '../CustomerRegistrationForm';
import { BrowserRouter } from 'react-router-dom';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Mock useCustomerInteraction
const mockAddCustomerToDatabase = vi.fn();
vi.mock('../../hooks/useCustomerInteraction', () => ({
    default: () => ({
        addCustomerToDatabase: mockAddCustomerToDatabase,
    }),
}));

describe('CustomerRegistrationForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render the form correctly', () => {
        render(
            <BrowserRouter>
                <CustomerRegistrationForm />
            </BrowserRouter>
        );

        expect(screen.getByText('Customer Registration')).toBeInTheDocument();
        expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    });

    it('should show error if required fields are empty', () => {
        render(
            <BrowserRouter>
                <CustomerRegistrationForm />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Register Customer'));

        expect(screen.getByText('First name and email are required.')).toBeInTheDocument();
    });

    it('should validate phone number length', () => {
        render(
            <BrowserRouter>
                <CustomerRegistrationForm />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '123' } });

        fireEvent.click(screen.getByText('Register Customer'));

        expect(screen.getByText('Phone number must be at least 10 digits.')).toBeInTheDocument();
    });

    it('should validate age (must be 18+)', () => {
        render(
            <BrowserRouter>
                <CustomerRegistrationForm />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });

        // Set DOB to be under 18 (e.g., 2020)
        fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '2020-01-01' } });

        fireEvent.click(screen.getByText('Register Customer'));

        expect(screen.getByText('You must be at least 18 years old to register.')).toBeInTheDocument();
    });

    it('should submit form successfully when valid', async () => {
        render(
            <BrowserRouter>
                <CustomerRegistrationForm />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '1990-01-01' } });

        fireEvent.click(screen.getByText('Register Customer'));

        await waitFor(() => {
            expect(mockAddCustomerToDatabase).toHaveBeenCalledWith(expect.objectContaining({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
            }));
            expect(screen.getByText('Registration Successful!')).toBeInTheDocument();
        });
    });
});
