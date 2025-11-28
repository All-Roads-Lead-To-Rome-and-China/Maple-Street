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

type CustomerInteractionContextProps = {
  children?: React.ReactNode;
};

interface CustomerInteractionContextType {
  addCustomerToDatabase: (customerInput: CustomerData) => Promise<void>;
}

export const CustomerInteractionContext =
  React.createContext<CustomerInteractionContextType | null>(null);

const CustomerInteractionProvider = ({
  children,
}: CustomerInteractionContextProps) => {
  const addCustomerToDatabase = async (customerInput: CustomerData) => {
    try {
      await databases.createDocument(
        CUSTOMER_INFO_DB,
        customerData,
        ID.unique(),
        customerInput
      );
    } catch (error) {
      console.error("Error adding customer to database:", error);
    }
  };

  return (
    <CustomerInteractionContext.Provider value={{ addCustomerToDatabase }}>
      {children}
    </CustomerInteractionContext.Provider>
  );
};

export default CustomerInteractionProvider;
