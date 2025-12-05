import { useState } from "react";
import useCustomerInteraction from "../hooks/useCustomerInteraction";
import { useNavigate } from "react-router-dom";

const CustomerRegistrationForm = () => {
  const { addCustomerToDatabase } = useCustomerInteraction();
  const navigate = useNavigate();

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  // Feedback + customerId state
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // ✅ Validation
    if (!firstName.trim() || !email.trim()) {
      setError("First name and email are required.");
      return;
    }

    // Phone validation
    if (phone && phone.replace(/\D/g, "").length < 10) {
      setError("Phone number must be at least 10 digits.");
      return;
    }

    // Age validation
    if (dateOfBirth) {
      const dob = new Date(dateOfBirth);
      const today = new Date();

      // Check if date is in the future
      if (dob > today) {
        setError("Date of birth cannot be in the future.");
        return;
      }

      // Check if user is at least 18
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      if (age < 18) {
        setError("You must be at least 18 years old to register.");
        return;
      }
    }

    try {
      const newCustomerId = "cust-" + Math.random().toString(36).substr(2, 9);

      const dataToSend = {
        customerId: newCustomerId,
        firstName,
        lastName,
        email,
        phone: phone || undefined,
        dateOfBirth: dateOfBirth || undefined,
      };

      await addCustomerToDatabase(dataToSend);

      setSuccess("Customer registered successfully!");
      setCustomerId(newCustomerId); // ✅ store ID for later use

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setDateOfBirth("");
    } catch (err) {
      console.error("Failed to register customer:", err);
      setError("Registration failed. Please try again.");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.875rem 1rem",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--border-color-strong)",
    background: "white",
    fontSize: "1rem",
    transition: "all 0.2s",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "var(--text-primary)",
  };

  return (
    <div
      className="page-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fbfbfd 0%, #f5f5f7 100%)",
      }}
    >
      <div style={{
        width: "100%",
        maxWidth: "520px",
        background: "white",
        borderRadius: "var(--radius-2xl)",
        padding: "2.5rem",
        border: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-lg)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: "64px",
            height: "64px",
            background: "linear-gradient(135deg, var(--primary-color) 0%, #40a9ff 100%)",
            borderRadius: "var(--radius-lg)",
            margin: "0 auto 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(0, 113, 227, 0.3)",
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
          </div>
          <h2 style={{
            color: "var(--text-primary)",
            fontSize: "1.75rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: "0.5rem",
          }}>
            Customer Registration
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
            Create your account to book appointments
          </p>
        </div>

        {!success ? (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label htmlFor="firstName" style={labelStyle}>First Name *</label>
                <input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--primary-color)";
                    e.target.style.boxShadow = "0 0 0 3px var(--primary-light)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--border-color-strong)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label htmlFor="lastName" style={labelStyle}>Last Name</label>
                <input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--primary-color)";
                    e.target.style.boxShadow = "0 0 0 3px var(--primary-light)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--border-color-strong)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" style={labelStyle}>Email *</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@example.com"
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--primary-color)";
                  e.target.style.boxShadow = "0 0 0 3px var(--primary-light)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--border-color-strong)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div>
              <label htmlFor="phone" style={labelStyle}>Phone</label>
              <input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--primary-color)";
                  e.target.style.boxShadow = "0 0 0 3px var(--primary-light)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--border-color-strong)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div>
              <label htmlFor="dateOfBirth" style={labelStyle}>Date of Birth</label>
              <input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                max={new Date().toISOString().split("T")[0]} // Prevent future dates in picker
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--primary-color)";
                  e.target.style.boxShadow = "0 0 0 3px var(--primary-light)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--border-color-strong)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "0.5rem", width: "100%", padding: "1rem" }}
            >
              Register Customer
            </button>

            <button
              type="button"
              onClick={() => navigate("/customer")}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-secondary)",
                cursor: "pointer",
                fontSize: "0.9375rem",
                alignSelf: "center",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary-color)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
            >
              ← Back to Portal
            </button>
          </form>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, var(--success-color) 0%, #2dd4bf 100%)",
              borderRadius: "50%",
              margin: "0 auto 1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(52, 199, 89, 0.3)",
            }}>
              <span style={{ fontSize: "2rem", color: "white" }}>✓</span>
            </div>
            <h3 style={{
              color: "var(--text-primary)",
              marginBottom: "0.75rem",
              fontSize: "1.5rem",
              fontWeight: 600,
            }}>
              Registration Successful!
            </h3>
            <p style={{
              marginBottom: "0.5rem",
              color: "var(--text-secondary)",
              fontSize: "1rem",
            }}>
              Your Customer ID is:
            </p>
            <p style={{
              background: "#f5f5f7",
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-md)",
              fontFamily: "monospace",
              fontSize: "1rem",
              color: "var(--primary-color)",
              fontWeight: 600,
              marginBottom: "2rem",
            }}>
              {customerId}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/customer/${customerId}/booking`)}
                style={{ width: "100%", padding: "1rem" }}
              >
                Book a Service Now
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/customer")}
                style={{ width: "100%", padding: "1rem" }}
              >
                Back to Portal
              </button>
            </div>
          </div>
        )}

        {/* ✅ Feedback messages */}
        {error && (
          <div style={{
            marginTop: "1.5rem",
            padding: "0.875rem 1rem",
            background: "rgba(255, 59, 48, 0.08)",
            border: "1px solid rgba(255, 59, 48, 0.2)",
            borderRadius: "var(--radius-md)",
            color: "var(--error-color)",
            textAlign: "center",
            fontSize: "0.9375rem",
          }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerRegistrationForm;