import { useState, useEffect } from "react";
import useInventory from "../hooks/useInventory";

const InventoryList = () => {
  const { getAllInventory, addItem, updateStock } = useInventory();

  const [items, setItems] = useState<any[]>([]);
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
      alert("Item added successfully!");
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
      alert("Stock updated successfully!");
      // Refresh list
      const refreshed = await getAllInventory();
      setItems(refreshed);
    } catch (err) {
      console.error("Error updating stock:", err);
      setError("Failed to update stock.");
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "left" }}>
      <h2>Staff: Inventory Management</h2>

      {/* Inventory Table */}
      <table border={1} cellPadding={8} style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price (£)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.$id}>
              <td>{i.$id}</td>
              <td>{i.itemName}</td>
              <td>{i.description || "N/A"}</td>
              <td>
                <input
                  type="number"
                  value={i.quantity}
                  onChange={(e) => {
                    const newQty = Number(e.target.value);
                    setItems((prev) =>
                      prev.map((p) => (p.$id === i.$id ? { ...p, quantity: newQty } : p))
                    );
                  }}
                />
              </td>
              <td>{i.price}</td>
              <td>
                <button onClick={() => handleUpdateStock(i.$id, i.quantity)}>Update Stock</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add New Item Form */}
      <div style={{ border: "1px solid #ccc", padding: "16px", marginTop: "20px" }}>
        <h3>Add New Item</h3>
        <label>
          Name:
          <input value={itemName} onChange={(e) => setItemName(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Price (£):
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>
        <br />
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default InventoryList;