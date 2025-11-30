import { useContext } from "react";
import { BookingContext } from "../contexts/BookingContext";

/**
 * Hook to access Booking Context.
 * Provides functions to create, retrieve, update, and cancel bookings.
 */
const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

export default useBooking;
