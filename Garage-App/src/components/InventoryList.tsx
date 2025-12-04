import { useState, useEffect } from "react";
import useInventory from "../hooks/useInventory";
import type { InventoryItem } from "../contexts/InventoryContext";

const InventoryList = () => {
  const { getAllInventory, addItem, updateStock } = useInventory();

  const [items, setItems] = useState<InventoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Form state for adding new item
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");

  // Fetch all inventory items when component mounts
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const data = await getAllInventory();
        setItems(data);
      } catch (err) {
        console.error("Error fetching inventory:", err);
        setError("Failed to fetch inventory.");
      }
    };
    fetchAll();
  }, [getAllInventory]);

  const handleAddItem = async () => {
    try {
      await addItem({ itemName, quantity, price, description });
      alert("✅ Item added successfully!");
      // Refresh list
      const refreshed = await getAllInventory();
      setItems(refreshed);
      // Reset form
      setItemName("");
      setQuantity(0);
      setPrice(0);
      setDescription("");
    } catch (err) {
      console.error("Error adding item:", err);
      setError("Failed to add item.");
    }
  };

  const handleUpdateStock = async (itemId: string, newQuantity: number) => {
    try {
      await updateStock(itemId, newQuantity);
      alert("✅ Stock updated successfully!");
      // Refresh list
      const refreshed = await getAllInventory();
      setItems(refreshed);
    } catch (err) {
      console.error("Error updating stock:", err);
      setError("Failed to update stock.");
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "2rem", color: "var(--primary-color)" }}>Inventory Management</h2>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
        {/* Inventory List */}
        <div className="glass-panel" style={{ padding: "0", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "var(--primary-color)", color: "white" }}>
              <tr>
                <th style={{ padding: "1rem", textAlign: "left" }}>Item</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Quantity</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Price (£)</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.$id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ fontWeight: "bold" }}>{i.itemName}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{i.description || "No description"}</div>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <input
                      type="number"
                      value={i.quantity}
                      onChange={(e) => {
                        const newQty = Number(e.target.value);
                        setItems((prev) =>
                          prev.map((p) => (p.$id === i.$id ? { ...p, quantity: newQty } : p))
                        );
                      }}
                      style={{
                        width: "60px",
                        padding: "0.25rem",
                        borderRadius: "0.25rem",
                        border: "1px solid #cbd5e1"
                      }}
                    />
                  </td>
                  <td style={{ padding: "1rem" }}>{i.price}</td>
                  <td style={{ padding: "1rem" }}>
                    <button
                      className="btn btn-secondary"
                      style={{ fontSize: "0.8rem", padding: "0.25rem 0.5rem" }}
                      onClick={() => i.$id && handleUpdateStock(i.$id, i.quantity)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Item Form */}
        <div className="glass-panel" style={{ padding: "1.5rem", height: "fit-content" }}>
          <h3 style={{ marginBottom: "1rem", color: "var(--primary-color)" }}>Add New Item</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Name</label>
              <input
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Description</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1" }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Price (£)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1" }}
                />
              </div>
            </div>
            <button className="btn btn-primary" style={{ marginTop: "1rem" }} onClick={handleAddItem}>Add Item</button>
          </div>
        </div>
      </div>

      {error && <p style={{ color: "var(--error-color)", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
};

export default InventoryList;