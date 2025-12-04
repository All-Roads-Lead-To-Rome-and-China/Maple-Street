import { useState, useEffect } from "react";
import useCustomerInteraction from "../hooks/useCustomerInteraction";
import type { CustomerData } from "../contexts/CustomerInteractionContext";

const CustomerList = () => {
  const { getAllCustomers, updateCustomer } = useCustomerInteraction();

  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  // Fetch all customers when component mounts
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const data = await getAllCustomers();
        setCustomers(data);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError("Failed to fetch customers.");
      }
    };
    fetchAll();
  }, [getAllCustomers]);

  const filteredCustomers = customers.filter(
    (c) =>
      c.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCustomer = (customer: CustomerData) => {
    setSelectedCustomer(customer);
  };

  const handleUpdateCustomer = async () => {
    if (!selectedCustomer?.$id) return;
    try {
      await updateCustomer(selectedCustomer.$id, {
        firstName: selectedCustomer.firstName,
        lastName: selectedCustomer.lastName,
        email: selectedCustomer.email,
        phone: selectedCustomer.phone,
        dateOfBirth: selectedCustomer.dateOfBirth,
      });
      alert("✅ Customer updated successfully!");
      // Refresh list after update
      const refreshed = await getAllCustomers();
      setCustomers(refreshed);
      setSelectedCustomer(null); // Close modal
    } catch (err) {
      console.error("Error updating customer:", err);
      alert("❌ Failed to update customer.");
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ color: "var(--primary-color)", margin: 0 }}>
          Customer Records
        </h2>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            border: "1px solid #cbd5e1",
            width: "300px",
            outline: "none",
            boxShadow: "var(--shadow-sm)",
          }}
        />
      </div>

      {/* Customer Table */}
      <div className="glass-panel" style={{ padding: "0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "var(--primary-color)", color: "white" }}>
            <tr>
              <th style={{ padding: "1rem", textAlign: "left" }}>Name</th>
              <th style={{ padding: "1rem", textAlign: "left" }}>Email</th>
              <th style={{ padding: "1rem", textAlign: "left" }}>Phone</th>
              <th style={{ padding: "1rem", textAlign: "left" }}>Active</th>
              <th style={{ padding: "1rem", textAlign: "left" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((c) => (
              <tr key={c.$id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "1rem" }}>
                  <div style={{ fontWeight: "bold" }}>
                    {c.firstName} {c.lastName}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    ID: {c.customerId}
                  </div>
                </td>
                <td style={{ padding: "1rem" }}>{c.email}</td>
                <td style={{ padding: "1rem" }}>{c.phone || "N/A"}</td>
                <td style={{ padding: "1rem" }}>
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "1rem",
                      background:
                        c.isActive !== false
                          ? "var(--success-color)"
                          : "var(--text-secondary)",
                      color: "white",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}
                  >
                    {c.isActive !== false ? "Active" : "Inactive"}
                  </span>
                </td>
                <td style={{ padding: "1rem" }}>
                  <button
                    className="btn btn-secondary"
                    style={{ fontSize: "0.875rem", padding: "0.5rem 1rem" }}
                    onClick={() => handleSelectCustomer(c)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {filteredCustomers.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    padding: "2rem",
                    textAlign: "center",
                    color: "var(--text-secondary)",
                  }}
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {selectedCustomer && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="glass-panel"
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "2rem",
              background: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h3 style={{ margin: 0, color: "var(--primary-color)" }}>
                Edit Customer
              </h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "var(--text-secondary)",
                }}
              >
                &times;
              </button>
            </div>
            <div style={{ display: "grid", gap: "1rem" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontSize: "0.9rem",
                  }}
                >
                  First Name
                </label>
                <input
                  value={selectedCustomer.firstName}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      firstName: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5e1",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontSize: "0.9rem",
                  }}
                >
                  Last Name
                </label>
                <input
                  value={selectedCustomer.lastName}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      lastName: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5e1",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontSize: "0.9rem",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={selectedCustomer.email}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      email: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5e1",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontSize: "0.9rem",
                  }}
                >
                  Phone
                </label>
                <input
                  value={selectedCustomer.phone || ""}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      phone: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5e1",
                  }}
                />
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                {/* <input
                  type="checkbox"
                  checked={selectedCustomer.isActive}
                  onChange={(e) => setSelectedCustomer({ ...selectedCustomer, isActive: e.target.checked })}
                  id="isActive"
                />
                <label htmlFor="isActive">Active Customer</label> */}
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={handleUpdateCustomer}
              >
                Save Changes
              </button>
              <button
                className="btn btn-outline"
                style={{ flex: 1 }}
                onClick={() => setSelectedCustomer(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <p style={{ color: "var(--error-color)", marginTop: "1rem" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default CustomerList;
