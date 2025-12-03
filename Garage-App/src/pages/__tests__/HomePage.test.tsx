import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HomePage from "../HomePage";
import { BrowserRouter } from "react-router-dom";

// Mock react-leaflet components
vi.mock("react-leaflet", () => ({
    MapContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="map-container">{children}</div>,
    TileLayer: () => <div data-testid="tile-layer" />,
    Marker: ({ children }: { children: React.ReactNode }) => <div data-testid="marker">{children}</div>,
    Popup: ({ children }: { children: React.ReactNode }) => <div data-testid="popup">{children}</div>,
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("HomePage Component", () => {
    it("renders the hero section with correct text", () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );

        expect(screen.getByText(/Expert Care for/i)).toBeInTheDocument();
        expect(screen.getByText(/Your Vehicle/i)).toBeInTheDocument();
        expect(screen.getByText(/Professional auto repair and maintenance services/i)).toBeInTheDocument();
    });

    it("navigates to customer portal when 'Book an appointment' is clicked", () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );

        const bookButton = screen.getByRole("button", { name: /Book an appointment/i });
        fireEvent.click(bookButton);

        expect(mockNavigate).toHaveBeenCalledWith("/customer");
    });

    it("renders the services grid", () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );

        expect(screen.getByText("Oil Change")).toBeInTheDocument();
        expect(screen.getByText("Brake Service")).toBeInTheDocument();
        expect(screen.getByText("Tire Rotation")).toBeInTheDocument();
        expect(screen.getByText("Engine Diagnostics")).toBeInTheDocument();
        expect(screen.getByText("Suspension")).toBeInTheDocument();
        expect(screen.getByText("Battery Service")).toBeInTheDocument();
    });

    it("renders the 'Why Choose Us' section", () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );

        expect(screen.getByText("Why Choose Us?")).toBeInTheDocument();
        expect(screen.getByText("Certified Mechanics")).toBeInTheDocument();
        expect(screen.getByText("Transparent Pricing")).toBeInTheDocument();
        expect(screen.getByText("Quality Parts")).toBeInTheDocument();
        expect(screen.getByText("Fast Turnaround")).toBeInTheDocument();
    });

    it("renders the map section", () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );

        expect(screen.getByText("Visit Us")).toBeInTheDocument();
        expect(screen.getByTestId("map-container")).toBeInTheDocument();
        expect(screen.getByTestId("tile-layer")).toBeInTheDocument();
        expect(screen.getByTestId("marker")).toBeInTheDocument();
    });

    it("renders the footer with links", () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );

        expect(screen.getByText("Maple Street Auto")).toBeInTheDocument();
        expect(screen.getByText("Contact Us")).toBeInTheDocument();
        expect(screen.getByText("Quick Links")).toBeInTheDocument();

        // Check for specific links using getByRole or getByText
        expect(screen.getByRole("link", { name: /Staff Portal/i })).toHaveAttribute("href", "/staff/login");
        expect(screen.getByRole("link", { name: /Book Appointment/i })).toHaveAttribute("href", "/customer/register");
    });
});
