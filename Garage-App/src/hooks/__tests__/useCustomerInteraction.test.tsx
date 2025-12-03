import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import useCustomerInteraction from '../useCustomerInteraction';
import { CustomerInteractionContext } from '../../contexts/CustomerInteractionContext';

describe('useCustomerInteraction', () => {
    it('should return customer interaction context values when used within CustomerInteractionProvider', () => {
        const mockContext = {
            addCustomerToDatabase: vi.fn(),
            getCustomerByCustomerId: vi.fn(),
            getAllCustomers: vi.fn(),
            updateCustomer: vi.fn(),
        };

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <CustomerInteractionContext.Provider value={mockContext}>
                {children}
            </CustomerInteractionContext.Provider>
        );

        const { result } = renderHook(() => useCustomerInteraction(), { wrapper });

        expect(result.current).toBe(mockContext);
    });

    it('should throw an error when used outside CustomerInteractionProvider', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        expect(() => renderHook(() => useCustomerInteraction())).toThrow(
            'useCustomerInteraction must be used within a CustomerInteractionProvider'
        );

        consoleSpy.mockRestore();
    });
});
