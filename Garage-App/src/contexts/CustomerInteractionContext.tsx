import React from "react";
import {
  databases,
  customerData,
  CUSTOMER_INFO_DB,
} from "../../services/appwrite";
import { ID } from "appwrite";

export interface CustomerData {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  isActive: boolean;
}

interface CustomerInteractionContextType {
  addCustomerToDatabase: (customerInput: CustomerData) => Promise<void>;
}

export const CustomerInteractionContext =
  React.createContext<CustomerInteractionContextType | null>(null);

type CustomerInteractionContextProps = {
  children?: React.ReactNode;
};

const CustomerInteractionProvider = ({
  children,
}: CustomerInteractionContextProps) => {
  const addCustomerToDatabase = async (customerInput: CustomerData) => {
    console.log("Sending data to Appwrite:", customerInput);
    try {
      const response = await databases.createDocument(
        CUSTOMER_INFO_DB,
        customerData,
        ID.unique(),
        customerInput
      );
      console.log("Appwrite success response:", response);
    } catch (error) {
      console.error("Appwrite createDocument failed:", error);
      throw error;
    }
  };

  return (
    <CustomerInteractionContext.Provider value={{ addCustomerToDatabase }}>
      {children}
    </CustomerInteractionContext.Provider>
  );
};

export default CustomerInteractionProvider;
