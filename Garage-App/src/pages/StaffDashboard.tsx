import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StaffContext, type MechanicData } from "../contexts/StaffContext";
import { BookingContext, type BookingData } from "../contexts/BookingContext";
import CustomerList from "../components/CustomerList";
import InventoryList from "../components/InventoryList";

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
          <div>
            <h2 style={{ marginBottom: "1.5rem", color: "var(--primary-color)" }}>Staff Scheduling</h2>
            <div className="glass-panel" style={{ padding: "1.5rem" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ textAlign: "left", padding: "1rem" }}>Mechanic</th>
                    <th style={{ textAlign: "left", padding: "1rem" }}>Specialization</th>
                    <th style={{ textAlign: "left", padding: "1rem" }}>Status</th>
                    <th style={{ textAlign: "left", padding: "1rem" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mechanics.map((mechanic) => (
                    <tr key={mechanic.$id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "1rem" }}>{mechanic.name}</td>
                      <td style={{ padding: "1rem" }}>{mechanic.specialization || "General"}</td>
                      <td style={{ padding: "1rem" }}>
                        <span style={{
                          padding: "0.25rem 0.75rem",
                          borderRadius: "1rem",
                          background: mechanic.isActive ? "var(--success-color)" : "var(--text-secondary)",
                          color: "white",
                          fontSize: "0.875rem"
                        }}>
                          {mechanic.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <button className="btn btn-secondary" style={{ fontSize: "0.875rem" }}>View Shifts</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "appointments":
        return (
          <div>
            <h2 style={{ marginBottom: "1.5rem", color: "var(--primary-color)" }}>Appointment Scheduling</h2>
            <div className="glass-panel" style={{ padding: "1.5rem" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ textAlign: "left", padding: "1rem" }}>Date</th>
                    <th style={{ textAlign: "left", padding: "1rem" }}>Customer</th>
                    <th style={{ textAlign: "left", padding: "1rem" }}>Vehicle</th>
                    <th style={{ textAlign: "left", padding: "1rem" }}>Service</th>
                    <th style={{ textAlign: "left", padding: "1rem" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.$id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "1rem" }}>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                      <td style={{ padding: "1rem" }}>{booking.customerId}</td>
                      <td style={{ padding: "1rem" }}>{booking.vehicleYear} {booking.vehicleMake} {booking.vehicleModel}</td>
                      <td style={{ padding: "1rem" }}>{booking.serviceType}</td>
                      <td style={{ padding: "1rem" }}>
                        <span style={{
                          padding: "0.25rem 0.75rem",
                          borderRadius: "1rem",
                          background: booking.status === "Confirmed" ? "var(--success-color)" :
                            booking.status === "Pending" ? "var(--accent-color)" : "var(--text-secondary)",
                          color: "white",
                          fontSize: "0.875rem"
                        }}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
          <div>
            <h2 style={{ marginBottom: "1.5rem", color: "var(--primary-color)" }}>Invoices & Payments</h2>
            <div className="glass-panel" style={{ padding: "2rem", textAlign: "center" }}>
              <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>No invoices generated yet.</p>
              <button className="btn btn-primary">Create New Invoice</button>
            </div>
          </div>
        );
      case "compliance":
        return (
          <div>
            <h2 style={{ marginBottom: "1.5rem", color: "var(--primary-color)" }}>Compliance & Safety</h2>
            <div className="glass-panel" style={{ padding: "1.5rem" }}>
              <ul style={{ listStyle: "none" }}>
                {["Daily Safety Inspection", "Equipment Calibration Check", "Waste Disposal Log", "Fire Safety Audit"].map((item, idx) => (
                  <li key={idx} style={{
                    padding: "1rem",
                    borderBottom: "1px solid #f1f5f9",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <span>{item}</span>
                    <button className="btn btn-secondary" style={{ fontSize: "0.875rem" }}>Complete</button>
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
                fontWeight: 500
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ marginTop: "auto" }}>
          <button
            className="btn btn-outline"
            style={{ width: "100%", color: "var(--error-color)", borderColor: "var(--error-color)" }}
            onClick={() => navigate("/")}
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
