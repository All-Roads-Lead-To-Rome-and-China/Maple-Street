import React from "react";
import {
  databases,
  customerData,
  CUSTOMER_INFO_DB,
} from "../../services/appwrite";
import { ID, Query } from "appwrite";

export interface CustomerData {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  isActive?: boolean;
  $id?: string; // Appwrite Document ID
}

interface CustomerInteractionContextType {
  /**
   * Adds a new customer to the database.
   * Use this when a user submits the registration form.
   * It filters out empty fields to prevent database errors.
   */
  addCustomerToDatabase: (customerInput: CustomerData) => Promise<void>;

  /**
   * Retrieves a customer by their unique Customer ID.
   * Use this to fetch profile details for the dashboard.
   * Returns null if the customer is not found.
   */
  getCustomerByCustomerId: (customerId: string) => Promise<CustomerData | null>;

  /**
   * Retrieves all customers from the database.
   * Returns an empty array if no customers are found or on error.
   */
  getAllCustomers: () => Promise<CustomerData[]>;

  /**
   * Updates an existing customer's information.
   * Use this when a user edits their profile.
   * Only updates the fields provided in the object.
   */
  updateCustomer: (
    documentId: string,
    updatedData: Partial<CustomerData>
  ) => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CustomerInteractionContext =
  React.createContext<CustomerInteractionContextType | null>(null);

type CustomerInteractionContextProps = {
  children?: React.ReactNode;
};

const CustomerInteractionProvider = ({
  children,
}: CustomerInteractionContextProps) => {
  /**
   * Adds a new customer to the database.
   * Use this when a user submits the registration form.
   * It filters out empty fields to prevent database errors.
   */
  const addCustomerToDatabase = async (customerInput: CustomerData) => {
    console.log("Sending data to Appwrite:", customerInput);
    try {
      // Ensure we don't send undefined fields that are not required
      const cleanData = Object.fromEntries(
        Object.entries(customerInput).filter((entry) => entry[1] != null)
      );

      const response = await databases.createDocument(
        CUSTOMER_INFO_DB,
        customerData,
        ID.unique(),
        cleanData
      );
      console.log("Appwrite success response:", response);
    } catch (error) {
      console.error("Appwrite createDocument failed:", error);
      throw error;
    }
  };

  /**
   * Retrieves a customer by their unique Customer ID.
   * Use this to fetch profile details for the dashboard.
   * Returns null if the customer is not found.
   */
  const getCustomerByCustomerId = async (
    customerId: string
  ): Promise<CustomerData | null> => {
    try {
      const response = await databases.listDocuments(
        CUSTOMER_INFO_DB,
        customerData,
        [Query.equal("customerId", customerId)]
      );

      if (response.documents.length > 0) {
        return response.documents[0] as unknown as CustomerData;
      }
      return null;
    } catch (error) {
      console.error("Error fetching customer:", error);
      return null;
    }
  };

  /**
   * Retrieves all customers from the database.
   * Returns an empty array if none are found or on error.
   */
  const getAllCustomers = async (): Promise<CustomerData[]> => {
    try {
      const response = await databases.listDocuments(
        CUSTOMER_INFO_DB,
        customerData
      );

      return response.documents as unknown as CustomerData[];
    } catch (error) {
      console.error("Error fetching all customers:", error);
      return [];
    }
  };

  /**
   * Updates an existing customer's information.
   * Use this when a user edits their profile.
   * Only updates the fields provided in the object.
   */
  const updateCustomer = async (
    documentId: string,
    updatedData: Partial<CustomerData>
  ) => {
    try {
      await databases.updateDocument(
        CUSTOMER_INFO_DB,
        customerData,
        documentId,
        updatedData
      );
    } catch (error) {
      console.error("Error updating customer:", error);
      throw error;
    }
  };

  return (
    <CustomerInteractionContext.Provider
      value={{
        addCustomerToDatabase,
        getCustomerByCustomerId,
        getAllCustomers,
        updateCustomer,
      }}
    >
      {children}
    </CustomerInteractionContext.Provider>
  );
};

export default CustomerInteractionProvider;
