import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import CustomerInteractionProvider from "./contexts/CustomerInteractionContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CustomerInteractionProvider>
      <App />
    </CustomerInteractionProvider>
  </StrictMode>
);
