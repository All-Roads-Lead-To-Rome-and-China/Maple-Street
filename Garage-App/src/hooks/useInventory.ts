import { useContext } from "react";
import { InventoryContext } from "../contexts/InventoryContext";

/**
 * Hook to access Inventory Context.
 * Provides functions to manage inventory items and stock.
 */
const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within a InventoryProvider");
  }
  return context;
};

export default useInventory;
