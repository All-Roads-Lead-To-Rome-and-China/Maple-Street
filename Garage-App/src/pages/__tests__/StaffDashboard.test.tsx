import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import StaffDashboard from "../StaffDashboard";
import { StaffContext } from "../../contexts/StaffContext";
import { BookingContext } from "../../contexts/BookingContext";
import { BrowserRouter } from "react-router-dom";

// Mock sub-components
vi.mock("../../components/CustomerList", () => ({ default: () => <div data-testid="customer-list">Customer List</div> }));
vi.mock("../../components/InventoryList", () => ({ default: () => <div data-testid="inventory-list">Inventory List</div> }));
vi.mock("../../components/AppointmentScheduling", () => ({ default: () => <div data-testid="appointment-scheduling">Appointment Scheduling</div> }));
vi.mock("../../components/StaffScheduling", () => ({ default: () => <div data-testid="staff-scheduling">Staff Scheduling</div> }));
vi.mock("../../components/Invoices", () => ({ default: () => <div data-testid="invoices">Invoices</div> }));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Mock context values
const mockGetAllMechanics = vi.fn().mockResolvedValue([
    { $id: "1", name: "Mike", role: "Mechanic", email: "mike@example.com", phone: "123" }
]);
const mockGetAllBookings = vi.fn().mockResolvedValue([
    { $id: "1", status: "Pending", bookingDate: new Date().toISOString() }
]);

const renderWithContext = (component: React.ReactNode) => {
    return render(
        <BrowserRouter>
            <StaffContext.Provider value={{
                getAllMechanics: mockGetAllMechanics,
                getMechanicShifts: vi.fn(),
                createShift: vi.fn(),
                swapShift: vi.fn()
            } as any}>
                <BookingContext.Provider value={{
                    getAllBookings: mockGetAllBookings,
                    createBooking: vi.fn(),
                    getBookingsByCustomer: vi.fn(),
                    getBookingsByMechanic: vi.fn(),
                    updateBookingStatus: vi.fn(),
                    assignMechanic: vi.fn()
                } as any}>
                    {component}
                </BookingContext.Provider>
            </StaffContext.Provider>
        </BrowserRouter>
    );
};

describe("StaffDashboard Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the dashboard with overview tab active by default", async () => {
        renderWithContext(<StaffDashboard />);

        expect(screen.getByText("Staff Portal")).toBeInTheDocument();
        expect(screen.getByText("Dashboard Overview")).toBeInTheDocument();

        // Check if data is fetched
        await waitFor(() => {
            expect(mockGetAllMechanics).toHaveBeenCalled();
            expect(mockGetAllBookings).toHaveBeenCalled();
        });

        // Check overview stats
        expect(screen.getByText("Total Mechanics")).toBeInTheDocument();
        expect(screen.getByText("Pending Bookings")).toBeInTheDocument();
        expect(screen.getByText("Today's Appointments")).toBeInTheDocument();
    });

    it("navigates between tabs", async () => {
        renderWithContext(<StaffDashboard />);

        // Wait for initial data load
        await waitFor(() => {
            expect(mockGetAllMechanics).toHaveBeenCalled();
        });

        // Click on Customer Records
        fireEvent.click(screen.getByRole("button", { name: "Customer Records" }));
        expect(screen.getByRole("heading", { name: "Customer Records" })).toBeInTheDocument();
        expect(screen.getByTestId("customer-list")).toBeInTheDocument();

        // Click on Staff Scheduling
        fireEvent.click(screen.getByRole("button", { name: "Staff Scheduling" }));
        expect(screen.getByTestId("staff-scheduling")).toBeInTheDocument();

        // Click on Appointments
        fireEvent.click(screen.getByRole("button", { name: "Appointments" }));
        expect(screen.getByTestId("appointment-scheduling")).toBeInTheDocument();

        // Click on Inventory Management
        fireEvent.click(screen.getByRole("button", { name: "Inventory Management" }));
        expect(screen.getByTestId("inventory-list")).toBeInTheDocument();

        // Click on Invoices
        fireEvent.click(screen.getByRole("button", { name: "Invoices & Payments" }));
        expect(screen.getByTestId("invoices")).toBeInTheDocument();

        // Click on Compliance
        fireEvent.click(screen.getByRole("button", { name: "Compliance & Safety" }));
        expect(screen.getByRole("heading", { name: "Compliance & Safety" })).toBeInTheDocument();
        expect(screen.getByText("Daily Safety Checklist")).toBeInTheDocument();
    });

    it("logs out when logout button is clicked", async () => {
        renderWithContext(<StaffDashboard />);

        // Wait for initial data load to avoid act warnings
        await waitFor(() => {
            expect(mockGetAllMechanics).toHaveBeenCalled();
        });

        const logoutButton = screen.getByRole("button", { name: /Logout/i });
        fireEvent.click(logoutButton);

        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
});
