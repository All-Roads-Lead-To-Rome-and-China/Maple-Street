import { useNavigate } from "react-router-dom";

const StaffDashboard = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        textAlign: "center",
        marginTop: "40px",
      }}
    >
      <h1>Welcome to the Staff Dashboard</h1>
      <p>Please select an option below:</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <button onClick={() => navigate("/staff/customers")}>
          Customer Records
        </button>
        <button onClick={() => navigate("/staff/appointments")}>
          Appointment Scheduling
        </button>
        <button onClick={() => navigate("/staff/inventory")}>
          Inventory Management
        </button>
        <button onClick={() => navigate("/staff/invoices")}>
          Invoices & Payments
        </button>
        <button onClick={() => navigate("/staff/scheduling")}>
          Staff Scheduling
        </button>
        <button onClick={() => navigate("/staff/compliance")}>
          Compliance & Safety
        </button>
      </div>
    </div>
  );
};

export default StaffDashboard;
