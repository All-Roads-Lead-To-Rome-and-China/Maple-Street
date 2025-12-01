import { useState, useEffect } from "react";
import useCustomerInteraction from "../hooks/useCustomerInteraction";

const CustomerList = () => {
  const { getAllCustomers, updateCustomer } = useCustomerInteraction();

  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
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

  const handleSelectCustomer = (customer: any) => {
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
      alert("Customer updated successfully!");
      // Refresh list after update
      const refreshed = await getAllCustomers();
      setCustomers(refreshed);
    } catch (err) {
      console.error("Error updating customer:", err);
      alert("Failed to update customer.");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
      <h2>Staff: Customer Records</h2>

      {/* Customer Table */}
      <table
        border={1}
        cellPadding={8}
        style={{ width: "100%", marginBottom: "20px" }}
      >
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.$id}>
              <td>{c.customerId}</td>
              <td>
                {c.firstName} {c.lastName}
              </td>
              <td>{c.email}</td>
              <td>{c.isActive ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => handleSelectCustomer(c)}>
                  View / Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Selected Customer Details */}
      {selectedCustomer && (
        <div style={{ border: "1px solid #ccc", padding: "16px" }}>
          <h3>Edit Customer</h3>
          <label>
            First Name:
            <input
              value={selectedCustomer.firstName}
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  firstName: e.target.value,
                })
              }
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              value={selectedCustomer.lastName}
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  lastName: e.target.value,
                })
              }
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={selectedCustomer.email}
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  email: e.target.value,
                })
              }
            />
          </label>
          <br />
          <label>
            Phone:
            <input
              value={selectedCustomer.phone || ""}
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  phone: e.target.value,
                })
              }
            />
          </label>
          <br />
          <label>
            Active:
            <input
              type="checkbox"
              checked={selectedCustomer.isActive}
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  isActive: e.target.checked,
                })
              }
            />
          </label>
          <br />
          <button onClick={handleUpdateCustomer}>Save Changes</button>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CustomerList;
