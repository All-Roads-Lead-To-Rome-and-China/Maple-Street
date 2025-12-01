import { useState } from "react";
import useCustomerInteraction from "../hooks/useCustomerInteraction";
import { useNavigate } from "react-router-dom";

const CustomerProfile = () => {
  const { getCustomerByCustomerId, updateCustomer } = useCustomerInteraction();
  const navigate = useNavigate();

  const [customerId, setCustomerId] = useState("");
  const [customer, setCustomer] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Editable fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleFetchProfile = async () => {
    setError(null);
    setSuccess(null);
    try {
      const data = await getCustomerByCustomerId(customerId);
      if (!data) {
        setError("Customer not found.");
        setCustomer(null);
        return;
      }
      setCustomer(data);

      // Populate editable fields
      setFirstName(data.firstName || "");
      setLastName(data.lastName || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setDateOfBirth(data.dateOfBirth || "");
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to fetch profile.");
    }
  };

  const handleUpdate = async () => {
    if (!customer?.$id) {
      setError("No customer loaded to update.");
      return;
    }
    try {
      await updateCustomer(customer.$id, {
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
      });
      setSuccess("Customer details updated successfully!");
      setIsEditing(false); // go back to view mode
    } catch (err) {
      console.error("Error updating customer:", err);
      setError("Failed to update customer.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "left" }}>
      <h2>Customer Profile</h2>

      {/* Step 1: Enter Customer ID */}
      <div style={{ marginBottom: "12px" }}>
        <label>Customer ID: </label>
        <input
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          placeholder="Enter Customer ID"
        />
        <button type="button" onClick={handleFetchProfile}>
          Fetch Profile
        </button>
      </div>

      {/* Step 2: Display Profile */}
      {customer && !isEditing && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            marginTop: "12px",
          }}
        >
          <h3>Profile Details</h3>
          <p>
            <strong>Customer ID:</strong> {customer.customerId}
          </p>
          <p>
            <strong>Name:</strong> {customer.firstName} {customer.lastName}
          </p>
          <p>
            <strong>Email:</strong> {customer.email}
          </p>
          <p>
            <strong>Phone:</strong> {customer.phone || "N/A"}
          </p>
          <p>
            <strong>Date of Birth:</strong> {customer.dateOfBirth || "N/A"}
          </p>
          <p>
            <strong>Active:</strong> {customer.isActive ? "Yes" : "No"}
          </p>

          <button onClick={() => setIsEditing(true)}>Make Changes</button>
          {/* ✅ Booking button always available when profile is loaded */}
          <button
            onClick={() => navigate(`/customer/${customer.customerId}/booking`)}
          >
            Book a Service
          </button>
        </div>
      )}

      {/* Step 3: Edit Mode */}
      {customer && isEditing && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            marginTop: "12px",
          }}
        >
          <h3>Edit Profile</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label>
              First Name:
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label>
              Last Name:
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Phone:
              <input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
            <label>
              Date of Birth:
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </label>
            <label>
              Active:
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            </label>
          </div>

          <button onClick={handleUpdate} style={{ marginTop: "12px" }}>
            Save Changes
          </button>
          <button
            onClick={() => setIsEditing(false)}
            style={{ marginTop: "12px" }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Feedback */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default CustomerProfile;
