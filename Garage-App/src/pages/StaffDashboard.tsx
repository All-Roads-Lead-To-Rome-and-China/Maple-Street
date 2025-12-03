import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StaffContext, type MechanicData } from "../contexts/StaffContext";
import { BookingContext, type BookingData } from "../contexts/BookingContext";
import CustomerList from "../components/CustomerList";
import InventoryList from "../components/InventoryList";
import AppointmentScheduling from "../components/AppointmentScheduling";
import StaffScheduling from "../components/StaffScheduling";
import Invoices from "../components/Invoices";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const staffContext = useContext(StaffContext);
  const bookingContext = useContext(BookingContext);

  const [activeTab, setActiveTab] = useState("overview");
  const [mechanics, setMechanics] = useState<MechanicData[]>([]);
  const [bookings, setBookings] = useState<BookingData[]>([]);

  useEffect(() => {
    if (staffContext) {
      staffContext.getAllMechanics().then(setMechanics);
    }
    if (bookingContext) {
      bookingContext.getAllBookings().then(setBookings);
    }
  }, [staffContext, bookingContext]);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div>
            <h2 style={{ marginBottom: "1.5rem", color: "var(--primary-color)" }}>Dashboard Overview</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
              <div className="glass-panel" style={{ padding: "1.5rem" }}>
                <h3>Total Mechanics</h3>
                <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent-color)" }}>{mechanics.length}</p>
              </div>
              <div className="glass-panel" style={{ padding: "1.5rem" }}>
                <h3>Pending Bookings</h3>
                <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent-color)" }}>
                  {bookings.filter(b => b.status === "Pending").length}
                </p>
              </div>
              <div className="glass-panel" style={{ padding: "1.5rem" }}>
                <h3>Today's Appointments</h3>
                <p style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent-color)" }}>
                  {bookings.filter(b => new Date(b.bookingDate).toDateString() === new Date().toDateString()).length}
                </p>
              </div>
            </div>
          </div>
        );
      case "customers":
        return (
          <div>
            <h2 style={{ marginBottom: "1.5rem", color: "var(--primary-color)" }}>Customer Records</h2>
            <div className="glass-panel" style={{ padding: "1.5rem" }}>
              <CustomerList />
            </div>
          </div>
        );
      case "staff-scheduling":
        return (
          <div className="glass-panel" style={{ padding: "1.5rem" }}>
            <StaffScheduling />
          </div>
        );
      case "appointments":
        return (
          <div className="glass-panel" style={{ padding: "1.5rem" }}>
            <AppointmentScheduling />
          </div>
        );
      case "inventory":
        return (
          <div>
            <h2 style={{ marginBottom: "1.5rem", color: "var(--primary-color)" }}>Inventory Management</h2>
            <div className="glass-panel" style={{ padding: "1.5rem" }}>
              <InventoryList />
            </div>
          </div>
        );
      case "invoices":
        return (
          <div className="glass-panel" style={{ padding: "1.5rem" }}>
            <Invoices />
          </div>
        );
      case "compliance":
        return (
          <div>
            <h2 style={{ marginBottom: "1.5rem", color: "var(--primary-color)" }}>Compliance & Safety</h2>
            <div className="glass-panel" style={{ padding: "0", overflow: "hidden" }}>
              <div style={{ background: "var(--primary-color)", padding: "1rem", color: "white", fontWeight: "bold" }}>
                Daily Safety Checklist
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {["Daily Safety Inspection", "Equipment Calibration Check", "Waste Disposal Log", "Fire Safety Audit", "Staff PPE Check"].map((item, idx) => (
                  <li key={idx} style={{
                    padding: "1.5rem",
                    borderBottom: "1px solid #f1f5f9",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "background 0.2s"
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        border: "2px solid #cbd5e1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}></div>
                      <span style={{ fontSize: "1.1rem" }}>{item}</span>
                    </div>
                    <button className="btn btn-secondary" style={{ fontSize: "0.875rem" }}>Mark Complete</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      default:
        return <div>Select a module</div>;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--background-color)" }}>
      {/* Sidebar */}
      <div style={{
        width: "250px",
        background: "white",
        borderRight: "1px solid #e2e8f0",
        padding: "2rem 1rem",
        display: "flex",
        flexDirection: "column"
      }}>
        <h2 style={{ marginBottom: "2rem", color: "var(--primary-color)", paddingLeft: "1rem" }}>Staff Portal</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {[
            { id: "overview", label: "Overview" },
            { id: "customers", label: "Customer Records" },
            { id: "staff-scheduling", label: "Staff Scheduling" },
            { id: "appointments", label: "Appointments" },
            { id: "inventory", label: "Inventory Management" },
            { id: "invoices", label: "Invoices & Payments" },
            { id: "compliance", label: "Compliance & Safety" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                textAlign: "left",
                padding: "1rem",
                borderRadius: "0.5rem",
                background: activeTab === item.id ? "var(--primary-color)" : "transparent",
                color: activeTab === item.id ? "white" : "var(--text-secondary)",
                border: "none",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
                transform: "translateX(0)"
              }}
              onMouseEnter={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.background = "#f1f5f9";
                  e.currentTarget.style.transform = "translateX(5px)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.background = "transparent";
                }
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ marginTop: "auto" }}>
          <button
            className="btn btn-outline"
            style={{
              width: "100%",
              color: "var(--error-color)",
              borderColor: "var(--error-color)",
              transition: "all 0.2s ease"
            }}
            onClick={() => navigate("/")}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--error-color)";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--error-color)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default StaffDashboard;
