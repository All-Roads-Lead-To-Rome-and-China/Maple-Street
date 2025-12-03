import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import useInventory from '../useInventory';
import { InventoryContext } from '../../contexts/InventoryContext';

describe('useInventory', () => {
    it('should return inventory context values when used within InventoryProvider', () => {
        const mockContext = {
            getAllInventory: vi.fn(),
            addItem: vi.fn(),
            updateStock: vi.fn(),
        };

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <InventoryContext.Provider value={mockContext}>
                {children}
            </InventoryContext.Provider>
        );

        const { result } = renderHook(() => useInventory(), { wrapper });

        expect(result.current).toBe(mockContext);
    });

    it('should throw an error when used outside InventoryProvider', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        expect(() => renderHook(() => useInventory())).toThrow(
            'useInventory must be used within a InventoryProvider'
        );

        consoleSpy.mockRestore();
    });
});
