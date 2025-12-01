import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import CustomerInteractionProvider from "./contexts/CustomerInteractionContext.tsx";
import { BookingProvider } from "./contexts/BookingContext.tsx";
import { StaffProvider } from "./contexts/StaffContext.tsx";
import { InventoryProvider } from "./contexts/InventoryContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CustomerInteractionProvider>
      <BookingProvider>
        <StaffProvider>
          <InventoryProvider>
            <App />
          </InventoryProvider>
        </StaffProvider>
      </BookingProvider>
    </CustomerInteractionProvider>
  </StrictMode>
);
