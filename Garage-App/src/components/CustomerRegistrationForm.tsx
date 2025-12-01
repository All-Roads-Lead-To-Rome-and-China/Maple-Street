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
    <div style={{ maxWidth: "500px", margin: "0 auto", textAlign: "left" }}>
      <h2>Customer Registration</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <div>
          <label>First Name *</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </div>
        <div>
          <label>Email *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
          />
        </div>
        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <button type="submit">Register Customer</button>
      </form>

      {/* ✅ Feedback messages */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {/* ✅ Booking button only appears after success */}
      {success && customerId && (
        <button onClick={() => navigate(`/customer/${customerId}/booking`)}>
          Book a Service
        </button>
      )}
    </div>
  );
};

export default CustomerRegistrationForm;