import React, { createContext } from "react";
import {
  databases,
  STAFF_MANAGEMENT_DB,
  MECHANICS_COLLECTION,
  SHIFTS_COLLECTION,
} from "../../services/appwrite";
import { ID, Query } from "appwrite";

export interface MechanicData {
  $id?: string;
  name: string;
  email: string;
  specialization?: string;
  isActive: boolean;
}

export interface ShiftData {
  $id?: string;
  mechanicId: string;
  startTime: string; // ISO Date string
  endTime: string; // ISO Date string
}

interface StaffContextType {
  /**
   * Retrieves all mechanics.
   * Use this to populate dropdowns or the staff directory.
   */
  getAllMechanics: () => Promise<MechanicData[]>;

  /**
   * Retrieves shifts for a specific mechanic.
   * Use this to display a mechanic's schedule.
   */
  getMechanicShifts: (mechanicId: string) => Promise<ShiftData[]>;

  /**
   * Creates a new shift for a mechanic.
   * Use this when scheduling staff hours.
   */
  createShift: (shiftData: Omit<ShiftData, "$id">) => Promise<void>;

  /**
   * Swaps a shift to a different mechanic.
   * Use this for schedule changes or cover requests.
   */
  swapShift: (shiftId: string, newMechanicId: string) => Promise<void>;
}

export const StaffContext = createContext<StaffContextType | null>(null);

export const StaffProvider = ({ children }: { children: React.ReactNode }) => {
  /**
   * Retrieves all mechanics.
   * Use this to populate dropdowns or the staff directory.
   */
  const getAllMechanics = async (): Promise<MechanicData[]> => {
    try {
      const response = await databases.listDocuments(
        STAFF_MANAGEMENT_DB,
        MECHANICS_COLLECTION
      );
      return response.documents as unknown as MechanicData[];
    } catch (error) {
      console.error("Error fetching mechanics:", error);
      return [];
    }
  };

  /**
   * Retrieves shifts for a specific mechanic.
   * Use this to display a mechanic's schedule.
   */
  const getMechanicShifts = async (
    mechanicId: string
  ): Promise<ShiftData[]> => {
    try {
      const response = await databases.listDocuments(
        STAFF_MANAGEMENT_DB,
        SHIFTS_COLLECTION,
        [Query.equal("mechanicId", mechanicId)]
      );
      return response.documents as unknown as ShiftData[];
    } catch (error) {
      console.error("Error fetching shifts:", error);
      return [];
    }
  };

  /**
   * Creates a new shift for a mechanic.
   * Use this when scheduling staff hours.
   */
  const createShift = async (shiftData: Omit<ShiftData, "$id">) => {
    try {
      await databases.createDocument(
        STAFF_MANAGEMENT_DB,
        SHIFTS_COLLECTION,
        ID.unique(),
        shiftData
      );
    } catch (error) {
      console.error("Error creating shift:", error);
      throw error;
    }
  };

  /**
   * Swaps a shift to a different mechanic.
   * Use this for schedule changes or cover requests.
   */
  const swapShift = async (shiftId: string, newMechanicId: string) => {
    try {
      await databases.updateDocument(
        STAFF_MANAGEMENT_DB,
        SHIFTS_COLLECTION,
        shiftId,
        { mechanicId: newMechanicId }
      );
    } catch (error) {
      console.error("Error swapping shift:", error);
      throw error;
    }
  };

  return (
    <StaffContext.Provider
      value={{
        getAllMechanics,
        getMechanicShifts,
        createShift,
        swapShift,
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};
