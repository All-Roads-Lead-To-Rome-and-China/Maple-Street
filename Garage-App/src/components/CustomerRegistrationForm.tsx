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

  return (
    <div className="page-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
      <div className="glass-panel" style={{ width: "100%", maxWidth: "500px", padding: "2.5rem" }}>
        <h2 style={{ marginBottom: "1.5rem", color: "var(--primary-color)", textAlign: "center" }}>Customer Registration</h2>

        {!success ? (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>First Name *</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", background: "rgba(255,255,255,0.8)" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Last Name</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", background: "rgba(255,255,255,0.8)" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@example.com"
                style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", background: "rgba(255,255,255,0.8)" }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", background: "rgba(255,255,255,0.8)" }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Date of Birth</label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                max={new Date().toISOString().split("T")[0]} // Prevent future dates in picker
                style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", background: "rgba(255,255,255,0.8)" }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: "1rem", width: "100%" }}>
              Register Customer
            </button>

            <button
              type="button"
              onClick={() => navigate("/customer")}
              style={{ background: "none", border: "none", color: "var(--primary-color)", cursor: "pointer", textDecoration: "underline", fontSize: "0.9rem", alignSelf: "center" }}
            >
              Back to Portal
            </button>
          </form>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
            <h3 style={{ color: "var(--success-color)", marginBottom: "1rem" }}>Registration Successful!</h3>
            <p style={{ marginBottom: "1.5rem", color: "var(--text-secondary)" }}>
              Your Customer ID is: <strong>{customerId}</strong>
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/customer/${customerId}/booking`)}
              >
                Book a Service Now
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/customer")}
              >
                Back to Portal
              </button>
            </div>
          </div>
        )}

        {/* ✅ Feedback messages */}
        {error && (
          <div style={{ marginTop: "1rem", padding: "0.75rem", background: "rgba(239, 68, 68, 0.1)", border: "1px solid var(--error-color)", borderRadius: "0.5rem", color: "var(--error-color)", textAlign: "center" }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerRegistrationForm;