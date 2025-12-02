import { useNavigate } from "react-router-dom";

const CustomerPortal = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      padding: "2rem"
    }}>
      <div className="container" style={{ maxWidth: "800px", width: "100%" }}>
        <h2 className="text-center" style={{
          marginBottom: "1rem",
          color: "var(--primary-color)",
          fontSize: "2.5rem"
        }}>
          Customer Portal
        </h2>
        <p className="text-center" style={{
          marginBottom: "3rem",
          color: "var(--text-secondary)",
          fontSize: "1.1rem"
        }}>
          Welcome to Maple Street Auto Repairs. Please choose your journey:
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem"
        }}>
          {/* New Customer */}
          <div className="glass-panel" style={{
            padding: "2.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            transition: "transform 0.2s ease",
            cursor: "pointer"
          }}
            onClick={() => navigate("/customer/register")}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{
              width: "60px",
              height: "60px",
              background: "var(--primary-color)",
              borderRadius: "50%",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1.5rem"
            }}>
              +
            </div>
            <h3 style={{ marginBottom: "1rem" }}>New Customer</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              First time here? Register your details to book an appointment.
            </p>
            <button className="btn btn-primary" style={{ width: "100%" }}>
              Get Started
            </button>
          </div>

          {/* Existing Customer */}
          <div className="glass-panel" style={{
            padding: "2.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            transition: "transform 0.2s ease",
            cursor: "pointer"
          }}
            onClick={() => navigate("/customer/profile")}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{
              width: "60px",
              height: "60px",
              background: "var(--accent-color)",
              borderRadius: "50%",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1.5rem"
            }}>
              ✓
            </div>
            <h3 style={{ marginBottom: "1rem" }}>Existing Customer</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              Already have an account? View your profile and bookings.
            </p>
            <button className="btn btn-secondary" style={{ width: "100%" }}>
              View Profile
            </button>
          </div>
        </div>

        <div className="text-center" style={{ marginTop: "3rem" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              textDecoration: "underline",
              cursor: "pointer"
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;