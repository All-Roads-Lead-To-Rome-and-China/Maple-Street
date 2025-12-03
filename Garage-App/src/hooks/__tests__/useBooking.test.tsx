import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import useBooking from '../useBooking';
import { BookingContext } from '../../contexts/BookingContext';

describe('useBooking', () => {
    it('should return booking context values when used within BookingProvider', () => {
        const mockContext = {
            createBooking: vi.fn(),
            getBookingsByCustomer: vi.fn(),
            getAllBookings: vi.fn(),
            getBookingsByMechanic: vi.fn(),
            updateBookingStatus: vi.fn(),
            assignMechanic: vi.fn(),
        };

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <BookingContext.Provider value={mockContext}>
                {children}
            </BookingContext.Provider>
        );

        const { result } = renderHook(() => useBooking(), { wrapper });

        expect(result.current).toBe(mockContext);
    });

    it('should throw an error when used outside BookingProvider', () => {
        // Suppress console.error for this test as React logs the error
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        expect(() => renderHook(() => useBooking())).toThrow(
            'useBooking must be used within a BookingProvider'
        );

        consoleSpy.mockRestore();
    });
});
