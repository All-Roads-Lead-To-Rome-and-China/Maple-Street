import { useContext } from "react";
import { StaffContext } from "../contexts/StaffContext";

/**
 * Hook to access Staff Context.
 * Provides functions to manage mechanics and shifts.
 */
const useStaff = () => {
  const context = useContext(StaffContext);
  if (!context) {
    throw new Error("useStaff must be used within a StaffProvider");
  }
  return context;
};

export default useStaff;
