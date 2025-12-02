import { useState, useEffect } from "react";
import useStaff from "../hooks/useStaff";
import useBooking from "../hooks/useBooking";

const StaffScheduling = () => {
  const { getAllMechanics, getMechanicShifts } = useStaff();
  const { getAllBookings, assignMechanic } = useBooking();

  const [mechanics, setMechanics] = useState<any[]>([]);
  const [shifts, setShifts] = useState<Record<string, any[]>>({});
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allMechanics = await getAllMechanics();
        setMechanics(allMechanics);

        const allBookings = await getAllBookings();
        setBookings(allBookings);

        // Fetch shifts for each mechanic
        const shiftMap: Record<string, any[]> = {};
        for (const mech of allMechanics) {
          const mechShifts = await getMechanicShifts(mech.$id!);
          shiftMap[mech.$id!] = mechShifts;
        }
        setShifts(shiftMap);
      } catch (err) {
        console.error("Error fetching staff scheduling data:", err);
        setError("Failed to fetch staff scheduling data.");
      }
    };
    fetchData();
  }, [getAllMechanics, getMechanicShifts, getAllBookings]);

  // ✅ Condition check: booking must fall within a mechanic's shift
  const canAssignBooking = (booking: any, mechanicId: string): boolean => {
    const mechShifts = shifts[mechanicId] || [];
    const bookingDate = new Date(booking.bookingDate);

    return mechShifts.some((shift) => {
      const start = new Date(shift.startTime);
      const end = new Date(shift.endTime);
      return bookingDate >= start && bookingDate <= end;
    });
  };

  const handleAssignMechanic = async (
    bookingId: string,
    mechanicId: string
  ) => {
    const booking = bookings.find((b) => b.$id === bookingId);
    if (!booking) return;

    if (!canAssignBooking(booking, mechanicId)) {
      alert("❌ Cannot assign mechanic: booking time is outside their shift.");
      return;
    }

    try {
      await assignMechanic(bookingId, mechanicId);
      alert("✅ Mechanic assigned successfully!");
      const refreshed = await getAllBookings();
      setBookings(refreshed);
    } catch (err) {
      console.error("Error assigning mechanic:", err);
      setError("Failed to assign mechanic.");
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "left" }}>
      <h2>Staff Scheduling</h2>

      <h3>Mechanics & Shifts</h3>
      {mechanics.map((m) => (
        <div key={m.$id} style={{ marginBottom: "20px" }}>
          <strong>{m.name}</strong> ({m.specialization || "General"})
          <ul>
            {(shifts[m.$id!] || []).map((s) => (
              <li key={s.$id}>
                {new Date(s.startTime).toLocaleString()} →{" "}
                {new Date(s.endTime).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <h3>Bookings</h3>
      <table
        border={1}
        cellPadding={8}
        style={{ width: "100%", marginBottom: "20px" }}
      >
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer</th>
            <th>Vehicle</th>
            <th>Service</th>
            <th>Date</th>
            <th>Mechanic Assignment</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.$id}>
              <td>{b.$id}</td>
              <td>{b.customerId}</td>
              <td>
                {b.vehicleMake} {b.vehicleModel} ({b.vehicleYear})
              </td>
              <td>{b.serviceType}</td>
              <td>{new Date(b.bookingDate).toLocaleString()}</td>
              <td>
                <select
                  value={b.mechanicId || ""}
                  onChange={(e) => handleAssignMechanic(b.$id!, e.target.value)}
                >
                  <option value="">Unassigned</option>
                  {mechanics.map((m) => (
                    <option
                      key={m.$id}
                      value={m.$id}
                      disabled={!canAssignBooking(b, m.$id!)} // ❌ disable if outside shift
                    >
                      {m.name} ({m.specialization || "General"})
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default StaffScheduling;
