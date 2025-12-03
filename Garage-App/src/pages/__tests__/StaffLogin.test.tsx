import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import StaffLogin from "../StaffLogin";
import { BrowserRouter } from "react-router-dom";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("StaffLogin Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the login form", () => {
        render(
            <BrowserRouter>
                <StaffLogin />
            </BrowserRouter>
        );

        expect(screen.getByText("Staff Login")).toBeInTheDocument();
        expect(screen.getByLabelText("Username")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    });

    it("navigates to staff dashboard on successful login", () => {
        render(
            <BrowserRouter>
                <StaffLogin />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText("Username"), { target: { value: "Test" } });
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: "Test1" } });
        fireEvent.click(screen.getByRole("button", { name: /Login/i }));

        expect(mockNavigate).toHaveBeenCalledWith("/staff");
    });

    it("displays error message on failed login", async () => {
        render(
            <BrowserRouter>
                <StaffLogin />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText("Username"), { target: { value: "Wrong" } });
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: "Wrong" } });
        fireEvent.click(screen.getByRole("button", { name: /Login/i }));

        await waitFor(() => {
            expect(screen.getByText("Invalid credentials. Please try again.")).toBeInTheDocument();
        });
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("navigates back to home when 'Back to Home' is clicked", () => {
        render(
            <BrowserRouter>
                <StaffLogin />
            </BrowserRouter>
        );

        const backButton = screen.getByRole("button", { name: /Back to Home/i });
        fireEvent.click(backButton);

        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
});
