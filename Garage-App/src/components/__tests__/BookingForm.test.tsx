import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BookingForm from '../BookingForm';
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

// Mock useBooking
const mockCreateBooking = vi.fn();
vi.mock('../../hooks/useBooking', () => ({
    default: () => ({
        createBooking: mockCreateBooking,
    }),
}));

describe('BookingForm', () => {
    const customerId = 'test-customer-id';

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render the first step (Vehicle Details)', () => {
        render(
            <BrowserRouter>
                <BookingForm customerId={customerId} />
            </BrowserRouter>
        );

        expect(screen.getByText('Book a Service')).toBeInTheDocument();
        expect(screen.getByText('Vehicle Details')).toBeInTheDocument();
        expect(screen.getByLabelText(/Registration Number/i)).toBeInTheDocument();
    });

    it('should validate step 1 and show error if fields are empty', () => {
        render(
            <BrowserRouter>
                <BookingForm customerId={customerId} />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Next Step'));

        expect(screen.getByText('Please fill in all vehicle details.')).toBeInTheDocument();
    });

    it('should proceed to step 2 when step 1 is valid', () => {
        render(
            <BrowserRouter>
                <BookingForm customerId={customerId} />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText(/Registration Number/i), { target: { value: 'ABC-123' } });
        fireEvent.change(screen.getByLabelText(/Vehicle Make/i), { target: { value: 'Toyota' } });
        fireEvent.change(screen.getByLabelText(/Vehicle Model/i), { target: { value: 'Corolla' } });

        fireEvent.click(screen.getByText('Next Step'));

        expect(screen.getByText('Service Type')).toBeInTheDocument();
        expect(screen.queryByText('Please fill in all vehicle details.')).not.toBeInTheDocument();
    });

    it('should submit the form successfully', async () => {
        render(
            <BrowserRouter>
                <BookingForm customerId={customerId} />
            </BrowserRouter>
        );

        // Step 1
        fireEvent.change(screen.getByLabelText(/Registration Number/i), { target: { value: 'ABC-123' } });
        fireEvent.change(screen.getByLabelText(/Vehicle Make/i), { target: { value: 'Toyota' } });
        fireEvent.change(screen.getByLabelText(/Vehicle Model/i), { target: { value: 'Corolla' } });
        fireEvent.click(screen.getByText('Next Step'));

        // Step 2
        fireEvent.click(screen.getByText('Oil Change'));
        fireEvent.click(screen.getByText('Next Step'));

        // Step 3
        fireEvent.change(screen.getByLabelText(/Preferred Date/i), { target: { value: '2025-12-25' } });
        fireEvent.change(screen.getByLabelText(/Preferred Time/i), { target: { value: '10:00' } });
        fireEvent.click(screen.getByText('Next Step'));

        // Step 4 (Confirm)
        expect(screen.getByText('Please confirm your details:')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Confirm Booking'));

        await waitFor(() => {
            expect(mockCreateBooking).toHaveBeenCalledWith(expect.objectContaining({
                customerId,
                vehicleMake: 'Toyota',
                serviceType: 'Oil Change',
            }));
            expect(mockNavigate).toHaveBeenCalled();
        });
    });
});
