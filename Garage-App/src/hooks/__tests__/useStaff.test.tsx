import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import useStaff from '../useStaff';
import { StaffContext } from '../../contexts/StaffContext';

describe('useStaff', () => {
    it('should return staff context values when used within StaffProvider', () => {
        const mockContext = {
            getAllMechanics: vi.fn(),
            getMechanicShifts: vi.fn(),
            createShift: vi.fn(),
            swapShift: vi.fn(),
        };

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <StaffContext.Provider value={mockContext}>
                {children}
            </StaffContext.Provider>
        );

        const { result } = renderHook(() => useStaff(), { wrapper });

        expect(result.current).toBe(mockContext);
    });

    it('should throw an error when used outside StaffProvider', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        expect(() => renderHook(() => useStaff())).toThrow(
            'useStaff must be used within a StaffProvider'
        );

        consoleSpy.mockRestore();
    });
});
