import React, { createContext } from "react";
import {
  databases,
  GARAGE_OPERATIONS_DB,
  INVENTORY_COLLECTION,
} from "../../services/appwrite";
import { ID } from "appwrite";

export interface InventoryItem {
  $id?: string;
  itemName: string;
  quantity: number;
  price: number;
  description?: string;
}

interface InventoryContextType {
  /**
   * Retrieves all inventory items.
   * Use this to display the current stock list.
   */
  getAllInventory: () => Promise<InventoryItem[]>;

  /**
   * Adds a new item to the inventory.
   * Use this when registering new parts or products.
   */
  addItem: (itemData: Omit<InventoryItem, "$id">) => Promise<void>;

  /**
   * Updates the stock quantity of an item.
   * Use this when stock is used or replenished.
   */
  updateStock: (itemId: string, newQuantity: number) => Promise<void>;
}

export const InventoryContext = createContext<InventoryContextType | null>(
  null
);

export const InventoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  /**
   * Retrieves all inventory items.
   * Use this to display the current stock list.
   */
  const getAllInventory = async (): Promise<InventoryItem[]> => {
    try {
      const response = await databases.listDocuments(
        GARAGE_OPERATIONS_DB,
        INVENTORY_COLLECTION
      );
      return response.documents as unknown as InventoryItem[];
    } catch (error) {
      console.error("Error fetching inventory:", error);
      return [];
    }
  };

  /**
   * Adds a new item to the inventory.
   * Use this when registering new parts or products.
   */
  const addItem = async (itemData: Omit<InventoryItem, "$id">) => {
    try {
      await databases.createDocument(
        GARAGE_OPERATIONS_DB,
        INVENTORY_COLLECTION,
        ID.unique(),
        itemData
      );
    } catch (error) {
      console.error("Error adding inventory item:", error);
      throw error;
    }
  };

  /**
   * Updates the stock quantity of an item.
   * Use this when stock is used or replenished.
   */
  const updateStock = async (itemId: string, newQuantity: number) => {
    try {
      await databases.updateDocument(
        GARAGE_OPERATIONS_DB,
        INVENTORY_COLLECTION,
        itemId,
        { quantity: newQuantity }
      );
    } catch (error) {
      console.error("Error updating stock:", error);
      throw error;
    }
  };

  return (
    <InventoryContext.Provider
      value={{ getAllInventory, addItem, updateStock }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
