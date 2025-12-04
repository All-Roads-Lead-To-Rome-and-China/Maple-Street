import { useState } from "react";
import useCustomerInteraction from "../hooks/useCustomerInteraction";
import { useNavigate } from "react-router-dom";
import type { CustomerData } from "../contexts/CustomerInteractionContext";

const CustomerProfile = () => {
  const { getCustomerByCustomerId, updateCustomer } = useCustomerInteraction();
  const navigate = useNavigate();

  const [customerId, setCustomerId] = useState("");
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Editable fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  // const [isActive] = useState(true);

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
      setIsEditing(false); // back to view mode
      // Refresh the customer object to reflect latest values
      setCustomer((prev) =>
        prev
          ? {
            ...prev,
            firstName,
            lastName,
            email,
            phone,
            dateOfBirth,
            isActive: prev.isActive,
          }
          : prev
      );
    } catch (err) {
      console.error("Error updating customer:", err);
      setError("Failed to update customer.");
    }
  };

  return (
    <div className="page-container" style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "80vh", paddingTop: "2rem" }}>
      <div className="glass-panel" style={{ width: "100%", maxWidth: "600px", padding: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2 style={{ color: "var(--primary-color)", margin: 0 }}>Customer Profile</h2>
          <button
            onClick={() => navigate("/customer")}
            style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "0.9rem" }}
          >
            ← Back to Portal
          </button>
        </div>

        {/* Step 1: Enter Customer ID */}
        {!customer && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <label style={{ fontSize: "0.9rem", fontWeight: "500" }}>Enter your Customer ID to view your profile:</label>
            <div style={{ display: "flex", gap: "1rem" }}>
              <input
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="e.g. cust-xyz123"
                style={{ flex: 1, padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", background: "rgba(255,255,255,0.8)" }}
              />
              <button className="btn btn-primary" onClick={handleFetchProfile}>
                Fetch Profile
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Display Profile (View mode) */}
        {customer && !isEditing && (
          <div className="fade-in">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid #e2e8f0", paddingBottom: "1rem" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.25rem" }}>{customer.firstName} {customer.lastName}</h3>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>ID: {customer.customerId}</span>
              </div>
              <div style={{ padding: "0.25rem 0.75rem", borderRadius: "1rem", background: customer.isActive !== false ? "var(--success-color)" : "var(--text-secondary)", color: "white", fontSize: "0.8rem" }}>
                {customer.isActive !== false ? "Active" : "Inactive"}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>Email</label>
                <div style={{ fontWeight: "500" }}>{customer.email}</div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>Phone</label>
                <div style={{ fontWeight: "500" }}>{customer.phone || "N/A"}</div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>Date of Birth</label>
                <div style={{ fontWeight: "500" }}>{customer.dateOfBirth || "N/A"}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>Edit Profile</button>
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/customer/${customer.customerId}/booking`)}
              >
                Book a Service
              </button>
              <button
                className="btn btn-outline"
                style={{ border: "1px solid var(--primary-color)", color: "var(--primary-color)", background: "transparent" }}
                onClick={() => navigate(`/customer/${customer.customerId}/bookings`)}
              >
                View My Bookings
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Edit Mode */}
        {customer && isEditing && (
          <div className="fade-in">
            <h3 style={{ marginBottom: "1.5rem", color: "var(--primary-color)" }}>Edit Profile</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>First Name</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", background: "rgba(255,255,255,0.8)" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Last Name</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", background: "rgba(255,255,255,0.8)" }}
                />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", background: "rgba(255,255,255,0.8)" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", background: "rgba(255,255,255,0.8)" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "500" }}>Date of Birth</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", background: "rgba(255,255,255,0.8)" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button className="btn btn-primary" onClick={handleUpdate}>Save Changes</button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Feedback */}
        {error && (
          <div style={{ marginTop: "1rem", padding: "0.75rem", background: "rgba(239, 68, 68, 0.1)", border: "1px solid var(--error-color)", borderRadius: "0.5rem", color: "var(--error-color)", textAlign: "center" }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ marginTop: "1rem", padding: "0.75rem", background: "rgba(34, 197, 94, 0.1)", border: "1px solid var(--success-color)", borderRadius: "0.5rem", color: "var(--success-color)", textAlign: "center" }}>
            {success}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerProfile;
