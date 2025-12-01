import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Maple Street Auto Repair System</h1>
      <p>Please choose your journey:</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "30px" }}>
        {/* Customer Journey */}
        <div style={{ border: "1px solid #ccc", padding: "20px", width: "250px" }}>
          <h2>Customer</h2>
          <p>Register, update your profile, and book services.</p>
          <button onClick={() => navigate("/customer")}>Go to Customer Portal</button>
        </div>

        {/* Staff Journey */}
        <div style={{ border: "1px solid #ccc", padding: "20px", width: "250px" }}>
          <h2>Staff</h2>
          <p>Manage customers, bookings, inventory, and staff schedules.</p>
          <button onClick={() => navigate("/staff")}>Go to Staff Dashboard</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;