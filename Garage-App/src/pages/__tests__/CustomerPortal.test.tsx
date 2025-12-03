import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CustomerPortal from "../CustomerPortal";
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

describe("CustomerPortal Component", () => {
    it("renders the portal options", () => {
        render(
            <BrowserRouter>
                <CustomerPortal />
            </BrowserRouter>
        );

        expect(screen.getByText("Customer Portal")).toBeInTheDocument();
        expect(screen.getByText("New Customer")).toBeInTheDocument();
        expect(screen.getByText("Existing Customer")).toBeInTheDocument();
    });

    it("navigates to register page when 'New Customer' is clicked", () => {
        render(
            <BrowserRouter>
                <CustomerPortal />
            </BrowserRouter>
        );

        const newCustomerCard = screen.getByText("New Customer").closest("div.glass-panel");
        fireEvent.click(newCustomerCard!);

        expect(mockNavigate).toHaveBeenCalledWith("/customer/register");
    });

    it("navigates to profile page when 'Existing Customer' is clicked", () => {
        render(
            <BrowserRouter>
                <CustomerPortal />
            </BrowserRouter>
        );

        const existingCustomerCard = screen.getByText("Existing Customer").closest("div.glass-panel");
        fireEvent.click(existingCustomerCard!);

        expect(mockNavigate).toHaveBeenCalledWith("/customer/profile");
    });

    it("navigates back to home when 'Back to Home' is clicked", () => {
        render(
            <BrowserRouter>
                <CustomerPortal />
            </BrowserRouter>
        );

        const backButton = screen.getByRole("button", { name: /Back to Home/i });
        fireEvent.click(backButton);

        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
});
