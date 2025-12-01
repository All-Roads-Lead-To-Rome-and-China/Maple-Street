import { useNavigate } from "react-router-dom";

const CustomerPortal = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Customer Portal</h2>
      <p>Welcome to Maple Street Auto Repairs. Please choose your journey:</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "30px" }}>
        {/* New Customer */}
        <div style={{ border: "1px solid #ccc", padding: "20px", width: "250px" }}>
          <h3>New Customer</h3>
          <p>Register your details to get started.</p>
          <button onClick={() => navigate("/customer/register")}>
            Go to Registration
          </button>
        </div>

        {/* Existing Customer */}
        <div style={{ border: "1px solid #ccc", padding: "20px", width: "250px" }}>
          <h3>Existing Customer</h3>
          <p>View or update your profile details.</p>
          <button onClick={() => navigate("/customer/profile")}>
            Go to Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;