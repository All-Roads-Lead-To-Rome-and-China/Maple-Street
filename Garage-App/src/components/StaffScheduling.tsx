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
<<<<<<< HEAD
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "2rem", color: "var(--primary-color)" }}>Staff Scheduling</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* Mechanics & Shifts Column */}
        <div>
          <h3 style={{ marginBottom: "1rem", color: "var(--text-primary)" }}>Mechanics & Shifts</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {mechanics.map((m) => (
              <div key={m.$id} className="glass-panel" style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "1.1rem" }}>{m.name}</h4>
                    <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{m.specialization || "General"}</span>
                  </div>
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "var(--primary-color)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold"
                  }}>
                    {m.name.charAt(0)}
                  </div>
                </div>
                <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "1rem" }}>
                  <h5 style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Assigned Shifts</h5>
                  {(shifts[m.$id!] || []).length > 0 ? (
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {(shifts[m.$id!] || []).map((s) => (
                        <li key={s.$id} style={{
                          fontSize: "0.9rem",
                          marginBottom: "0.5rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem"
                        }}>
                          <span style={{ color: "var(--success-color)" }}>●</span>
                          {new Date(s.startTime).toLocaleDateString()} {new Date(s.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          <span style={{ color: "var(--text-secondary)" }}>➝</span>
                          {new Date(s.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontStyle: "italic" }}>No shifts assigned</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bookings Column */}
        <div>
          <h3 style={{ marginBottom: "1rem", color: "var(--text-primary)" }}>Pending Assignments</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {bookings.filter(b => b.status !== 'Cancelled' && b.status !== 'Completed').map((b) => (
              <div key={b.$id} className="glass-panel" style={{ padding: "1.5rem", borderLeft: "4px solid var(--accent-color)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: "bold", color: "var(--primary-color)" }}>{b.serviceType}</span>
                  <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{new Date(b.bookingDate).toLocaleDateString()}</span>
                </div>
                <p style={{ margin: "0 0 1rem 0", fontSize: "0.9rem" }}>
                  {b.vehicleYear} {b.vehicleMake} {b.vehicleModel}
                </p>

                <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.25rem", color: "var(--text-secondary)" }}>Assign Mechanic:</label>
                <select
                  value={b.mechanicId || ""}
                  onChange={(e) => handleAssignMechanic(b.$id!, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5e1",
                    background: "white"
                  }}
=======
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
>>>>>>> origin/FE
                >
                  <option value="">Unassigned</option>
                  {mechanics.map((m) => (
                    <option
                      key={m.$id}
                      value={m.$id}
                      disabled={!canAssignBooking(b, m.$id!)} // ❌ disable if outside shift
                    >
<<<<<<< HEAD
                      {m.name} ({m.specialization || "General"}) {!canAssignBooking(b, m.$id!) && "(Unavailable)"}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            {bookings.filter(b => b.status !== 'Cancelled' && b.status !== 'Completed').length === 0 && (
              <p style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>No pending bookings to assign.</p>
            )}
          </div>
        </div>
      </div>

      {error && <p style={{ color: "var(--error-color)", marginTop: "1rem" }}>{error}</p>}
=======
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
>>>>>>> origin/FE
    </div>
  );
};

export default StaffScheduling;
