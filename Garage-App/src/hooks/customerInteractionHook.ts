import { useContext } from "react";
import { CustomerInteractionContext } from "../contexts/CustomerInteractionContext";

const customerInteractionHook = () => {
  const context = useContext(CustomerInteractionContext);

  if (!context) {
    throw new Error(
      "customerInteractionHook must be used within a CustomerInteractionProvider"
    );
  }

  return context;
};

export default customerInteractionHook;
