import { useContext } from "react";
import { CustomerInteractionContext } from "../contexts/CustomerInteractionContext";

const useCustomerInteraction = () => {
  const context = useContext(CustomerInteractionContext);

  if (!context) {
    throw new Error(
      "useCustomerInteraction must be used within a CustomerInteractionProvider"
    );
  }

  return context;
};

export default useCustomerInteraction;
