import React, { createContext, useContext } from "react";
import {
  databases,
  GARAGE_OPERATIONS_DB,
  BOOKINGS_COLLECTION,
} from "../../services/appwrite";
import { ID, Query } from "appwrite";

export interface BookingData {
  $id?: string;
  customerId: string;
  mechanicId?: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  serviceType: string;
  bookingDate: string; // ISO Date string
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  notes?: string;
}

interface BookingContextType {
  /**
   * Creates a new booking.
   * Use this when a customer requests a service.
   * Automatically sets the status to "Pending".
   */
  createBooking: (
    bookingData: Omit<BookingData, "$id" | "status">
  ) => Promise<void>;

  /**
   * Retrieves all bookings for a specific customer.
   * Use this to display a customer's booking history.
   */
  getBookingsByCustomer: (customerId: string) => Promise<BookingData[]>;

  /**
   * Retrieves all bookings.
   * Use this for the admin dashboard to see all scheduled jobs.
   */
  getAllBookings: () => Promise<BookingData[]>;

  /**
   * Retrieves all bookings assigned to a specific mechanic.
   * Use this to check a mechanic's schedule and calculate load.
   */
  getBookingsByMechanic: (mechanicId: string) => Promise<BookingData[]>;

  /**
   * Updates the status of a booking.
   * Use this when moving a job from Pending -> Confirmed -> Completed.
   */
  updateBookingStatus: (
    bookingId: string,
    status: BookingData["status"]
  ) => Promise<void>;

  /**
   * Assigns a mechanic to a booking.
   * Use this to allocate staff to a specific job.
   */
  assignMechanic: (bookingId: string, mechanicId: string) => Promise<void>;
}

export const BookingContext = createContext<BookingContextType | null>(null);

export const BookingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  /**
   * Creates a new booking.
   * Use this when a customer requests a service.
   * Automatically sets the status to "Pending".
   */
  const createBooking = async (
    bookingData: Omit<BookingData, "$id" | "status">
  ) => {
    try {
      await databases.createDocument(
        GARAGE_OPERATIONS_DB,
        BOOKINGS_COLLECTION,
        ID.unique(),
        {
          ...bookingData,
          status: "Pending",
        }
      );
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  };

  /**
   * Retrieves all bookings for a specific customer.
   * Use this to display a customer's booking history.
   */
  const getBookingsByCustomer = async (
    customerId: string
  ): Promise<BookingData[]> => {
    try {
      const response = await databases.listDocuments(
        GARAGE_OPERATIONS_DB,
        BOOKINGS_COLLECTION,
        [Query.equal("customerId", customerId)]
      );
      return response.documents as unknown as BookingData[];
    } catch (error) {
      console.error("Error fetching customer bookings:", error);
      return [];
    }
  };

  /**
   * Retrieves all bookings.
   * Use this for the admin dashboard to see all scheduled jobs.
   */
  const getAllBookings = async (): Promise<BookingData[]> => {
    try {
      const response = await databases.listDocuments(
        GARAGE_OPERATIONS_DB,
        BOOKINGS_COLLECTION
      );
      return response.documents as unknown as BookingData[];
    } catch (error) {
      console.error("Error fetching all bookings:", error);
      return [];
    }
  };

  /**
   * Retrieves all bookings assigned to a specific mechanic.
   * Use this to check a mechanic's schedule and calculate load.
   */
  const getBookingsByMechanic = async (
    mechanicId: string
  ): Promise<BookingData[]> => {
    try {
      const response = await databases.listDocuments(
        GARAGE_OPERATIONS_DB,
        BOOKINGS_COLLECTION,
        [Query.equal("mechanicId", mechanicId)]
      );
      return response.documents as unknown as BookingData[];
    } catch (error) {
      console.error("Error fetching mechanic bookings:", error);
      return [];
    }
  };

  /**
   * Updates the status of a booking.
   * Use this when moving a job from Pending -> Confirmed -> Completed.
   */
  const updateBookingStatus = async (
    bookingId: string,
    status: BookingData["status"]
  ) => {
    try {
      await databases.updateDocument(
        GARAGE_OPERATIONS_DB,
        BOOKINGS_COLLECTION,
        bookingId,
        { status }
      );
    } catch (error) {
      console.error("Error updating booking status:", error);
      throw error;
    }
  };

  /**
   * Assigns a mechanic to a booking.
   * Use this to allocate staff to a specific job.
   */
  const assignMechanic = async (bookingId: string, mechanicId: string) => {
    try {
      await databases.updateDocument(
        GARAGE_OPERATIONS_DB,
        BOOKINGS_COLLECTION,
        bookingId,
        { mechanicId }
      );
    } catch (error) {
      console.error("Error assigning mechanic:", error);
      throw error;
    }
  };

  return (
    <BookingContext.Provider
      value={{
        createBooking,
        getBookingsByCustomer,
        getAllBookings,
        getBookingsByMechanic,
        updateBookingStatus,
        assignMechanic,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
