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

  const navItems = [
    { id: "overview", label: "Overview", icon: "◉" },
    { id: "customers", label: "Customer Records", icon: "👤" },
    { id: "staff-scheduling", label: "Staff Scheduling", icon: "📅" },
    { id: "appointments", label: "Appointments", icon: "🗓" },
    { id: "inventory", label: "Inventory", icon: "📦" },
    { id: "invoices", label: "Invoices & Payments", icon: "💳" },
    { id: "compliance", label: "Compliance & Safety", icon: "✓" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <h2 style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                marginBottom: "0.5rem",
              }}>
                Dashboard Overview
              </h2>
              <p style={{ color: "var(--text-secondary)" }}>
                Welcome back. Here's what's happening today.
              </p>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem"
            }}>
              {[
                { label: "Total Mechanics", value: mechanics.length, color: "#0071e3", bg: "rgba(0, 113, 227, 0.08)" },
                { label: "Pending Bookings", value: bookings.filter(b => b.status === "Pending").length, color: "#ff9500", bg: "rgba(255, 149, 0, 0.08)" },
                { label: "Today's Appointments", value: bookings.filter(b => new Date(b.bookingDate).toDateString() === new Date().toDateString()).length, color: "#34c759", bg: "rgba(52, 199, 89, 0.08)" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "white",
                    borderRadius: "var(--radius-xl)",
                    padding: "2rem",
                    border: "1px solid var(--border-color)",
                    boxShadow: "var(--shadow-sm)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-md)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                  }}
                >
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--radius-md)",
                    background: stat.bg,
                    marginBottom: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <div style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: stat.color,
                    }} />
                  </div>
                  <p style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                  }}>
                    {stat.label}
                  </p>
                  <p style={{
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case "customers":
        return (
          <div>
            <h2 style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}>
              Customer Records
            </h2>
            <div style={{
              background: "white",
              borderRadius: "var(--radius-xl)",
              padding: "1.5rem",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--shadow-sm)",
            }}>
              <CustomerList />
            </div>
          </div>
        );
      case "staff-scheduling":
        return (
          <div style={{
            background: "white",
            borderRadius: "var(--radius-xl)",
            padding: "1.5rem",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-sm)",
          }}>
            <StaffScheduling />
          </div>
        );
      case "appointments":
        return (
          <div style={{
            background: "white",
            borderRadius: "var(--radius-xl)",
            padding: "1.5rem",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-sm)",
          }}>
            <AppointmentScheduling />
          </div>
        );
      case "inventory":
        return (
          <div>
            <h2 style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}>
              Inventory Management
            </h2>
            <div style={{
              background: "white",
              borderRadius: "var(--radius-xl)",
              padding: "1.5rem",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--shadow-sm)",
            }}>
              <InventoryList />
            </div>
          </div>
        );
      case "invoices":
        return (
          <div style={{
            background: "white",
            borderRadius: "var(--radius-xl)",
            padding: "1.5rem",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-sm)",
          }}>
            <Invoices />
          </div>
        );
      case "compliance":
        return (
          <div>
            <h2 style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}>
              Compliance & Safety
            </h2>
            <div style={{
              background: "white",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--shadow-sm)",
            }}>
              <div style={{
                background: "linear-gradient(135deg, var(--primary-color) 0%, #40a9ff 100%)",
                padding: "1.25rem 1.5rem",
                color: "white",
                fontWeight: 600,
                fontSize: "1rem",
              }}>
                Daily Safety Checklist
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {["Daily Safety Inspection", "Equipment Calibration Check", "Waste Disposal Log", "Fire Safety Audit", "Staff PPE Check"].map((item, idx) => (
                  <li key={idx} style={{
                    padding: "1.25rem 1.5rem",
                    borderBottom: idx < 4 ? "1px solid var(--border-color)" : "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "background 0.2s"
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#fafafa"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        border: "2px solid var(--border-color-strong)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                        cursor: "pointer",
                      }}></div>
                      <span style={{ fontSize: "1rem", color: "var(--text-primary)" }}>{item}</span>
                    </div>
                    <button
                      className="btn btn-secondary"
                      style={{
                        fontSize: "0.875rem",
                        padding: "0.625rem 1rem",
                      }}
                    >
                      Mark Complete
                    </button>
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
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f5f7" }}>
      {/* Sidebar */}
      <div style={{
        width: "280px",
        background: "white",
        borderRight: "1px solid var(--border-color)",
        padding: "2rem 1rem",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}>
        <div style={{ padding: "0 1rem", marginBottom: "2.5rem" }}>
          <h2 style={{
            color: "var(--text-primary)",
            fontSize: "1.25rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}>
            Staff Portal
          </h2>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.375rem", flex: 1 }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                textAlign: "left",
                padding: "0.875rem 1rem",
                borderRadius: "var(--radius-md)",
                background: activeTab === item.id
                  ? "linear-gradient(135deg, var(--primary-color) 0%, #40a9ff 100%)"
                  : "transparent",
                color: activeTab === item.id ? "white" : "var(--text-secondary)",
                border: "none",
                fontWeight: activeTab === item.id ? 600 : 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                fontSize: "0.9375rem",
              }}
              onMouseEnter={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.background = "#f5f5f7";
                  e.currentTarget.style.color = "var(--text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }
              }}
            >
              <span style={{ opacity: activeTab === item.id ? 1 : 0.7 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ marginTop: "auto", padding: "1rem 0" }}>
          <button
            style={{
              width: "100%",
              padding: "0.875rem 1rem",
              borderRadius: "var(--radius-md)",
              background: "transparent",
              color: "var(--error-color)",
              border: "1px solid rgba(255, 59, 48, 0.3)",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontSize: "0.9375rem",
            }}
            onClick={() => navigate("/")}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--error-color)";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.borderColor = "var(--error-color)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--error-color)";
              e.currentTarget.style.borderColor = "rgba(255, 59, 48, 0.3)";
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "2.5rem", overflowY: "auto" }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default StaffDashboard;
