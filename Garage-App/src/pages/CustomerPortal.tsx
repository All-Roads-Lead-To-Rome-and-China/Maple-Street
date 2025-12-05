import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { initScrollAnimations } from "../hooks/useScrollAnimation";

const CustomerPortal = () => {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = initScrollAnimations(pageRef);
    return cleanup;
  }, []);

  return (
    <div
      ref={pageRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #fbfbfd 0%, #f5f5f7 100%)",
        padding: "2rem"
      }}
    >
      <div className="container" style={{ maxWidth: "900px", width: "100%" }}>
        <div className="scroll-fade-up" style={{ textAlign: "center", marginBottom: "1rem" }}>
          <p style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--primary-color)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "0.75rem",
          }}>
            Welcome
          </p>
        </div>
        <h2 className="scroll-fade-up delay-100 text-center" style={{
          marginBottom: "1rem",
          color: "var(--text-primary)",
          fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
          letterSpacing: "-0.03em",
          fontWeight: 700,
        }}>
          Customer Portal
        </h2>
        <p className="scroll-fade-up delay-200 text-center" style={{
          marginBottom: "4rem",
          color: "var(--text-secondary)",
          fontSize: "1.25rem",
          maxWidth: "500px",
          margin: "0 auto 4rem",
        }}>
          Welcome to Maple Street Auto Repairs. Please choose your journey.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem"
        }}>
          {/* New Customer */}
          <div
            className="scroll-fade-up delay-300"
            style={{
              background: "white",
              borderRadius: "var(--radius-2xl)",
              padding: "3rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
              cursor: "pointer",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--shadow-sm)",
            }}
            onClick={() => navigate("/customer/register")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
            }}
          >
            <div style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, var(--primary-color) 0%, #40a9ff 100%)",
              borderRadius: "50%",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "2rem",
              fontWeight: 300,
              boxShadow: "0 8px 24px rgba(0, 113, 227, 0.3)",
            }}>
              +
            </div>
            <h3 style={{
              marginBottom: "1rem",
              fontSize: "1.5rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}>
              New Customer
            </h3>
            <p style={{
              color: "var(--text-secondary)",
              marginBottom: "2rem",
              fontSize: "1rem",
              lineHeight: 1.6,
            }}>
              First time here? Register your details to book an appointment.
            </p>
            <button
              className="btn btn-primary"
              style={{
                width: "100%",
                padding: "1rem 2rem",
              }}
            >
              Get Started
            </button>
          </div>

          {/* Existing Customer */}
          <div
            className="scroll-fade-up delay-400"
            style={{
              background: "white",
              borderRadius: "var(--radius-2xl)",
              padding: "3rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
              cursor: "pointer",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--shadow-sm)",
            }}
            onClick={() => navigate("/customer/profile")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
            }}
          >
            <div style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, var(--success-color) 0%, #2dd4bf 100%)",
              borderRadius: "50%",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1.75rem",
              boxShadow: "0 8px 24px rgba(52, 199, 89, 0.3)",
            }}>
              ✓
            </div>
            <h3 style={{
              marginBottom: "1rem",
              fontSize: "1.5rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}>
              Existing Customer
            </h3>
            <p style={{
              color: "var(--text-secondary)",
              marginBottom: "2rem",
              fontSize: "1rem",
              lineHeight: 1.6,
            }}>
              Already have an account? View your profile and bookings.
            </p>
            <button
              className="btn btn-secondary"
              style={{
                width: "100%",
                padding: "1rem 2rem",
              }}
            >
              View Profile
            </button>
          </div>
        </div>

        <div className="text-center scroll-fade-up delay-500" style={{ marginTop: "4rem" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary-color)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;