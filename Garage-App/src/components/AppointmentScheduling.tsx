import { useState, useEffect } from "react";
import useBooking from "../hooks/useBooking";
import useStaff from "../hooks/useStaff";

const AppointmentScheduling = () => {
  const { getAllBookings, updateBookingStatus, assignMechanic } = useBooking();
  const { getAllMechanics } = useStaff();

  const [bookings, setBookings] = useState<any[]>([]);
  const [mechanics, setMechanics] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch bookings + mechanics on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allBookings = await getAllBookings();
        setBookings(allBookings);

        const allMechanics = await getAllMechanics();
        setMechanics(allMechanics);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch bookings or mechanics.");
      }
    };
    fetchData();
  }, [getAllBookings, getAllMechanics]);

  // Update booking status
  const handleStatusChange = async (bookingId: string, status: string) => {
    try {
      await updateBookingStatus(bookingId, status as any);
      const refreshed = await getAllBookings();
      setBookings(refreshed);
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update booking status.");
    }
  };

  // Assign mechanic
  const handleAssignMechanic = async (
    bookingId: string,
    mechanicId: string
  ) => {
    try {
      await assignMechanic(bookingId, mechanicId);
      const refreshed = await getAllBookings();
      setBookings(refreshed);
    } catch (err) {
      console.error("Error assigning mechanic:", err);
      setError("Failed to assign mechanic.");
    }
  };

<<<<<<< HEAD
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "var(--success-color)";
      case "Pending": return "var(--accent-color)";
      case "Completed": return "var(--primary-color)";
      case "Cancelled": return "var(--error-color)";
      default: return "var(--text-secondary)";
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "2rem", color: "var(--primary-color)" }}>Appointment Scheduling</h2>

      <div className="glass-panel" style={{ padding: "0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "var(--primary-color)", color: "white" }}>
            <tr>
              <th style={{ padding: "1rem", textAlign: "left" }}>Date</th>
              <th style={{ padding: "1rem", textAlign: "left" }}>Vehicle</th>
              <th style={{ padding: "1rem", textAlign: "left" }}>Service</th>
              <th style={{ padding: "1rem", textAlign: "left" }}>Status</th>
              <th style={{ padding: "1rem", textAlign: "left" }}>Mechanic</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.$id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "1rem" }}>
                  <div style={{ fontWeight: "bold" }}>{new Date(b.bookingDate).toLocaleDateString()}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{new Date(b.bookingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </td>
                <td style={{ padding: "1rem" }}>
                  {b.vehicleYear} {b.vehicleMake} {b.vehicleModel}
                </td>
                <td style={{ padding: "1rem" }}>{b.serviceType}</td>
                <td style={{ padding: "1rem" }}>
                  <select
                    value={b.status}
                    onChange={(e) => handleStatusChange(b.$id!, e.target.value)}
                    style={{
                      padding: "0.25rem 0.5rem",
                      borderRadius: "1rem",
                      border: `1px solid ${getStatusColor(b.status)}`,
                      color: getStatusColor(b.status),
                      fontWeight: "bold",
                      background: "white",
                      cursor: "pointer"
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td style={{ padding: "1rem" }}>
                  <select
                    value={b.mechanicId || ""}
                    onChange={(e) => handleAssignMechanic(b.$id!, e.target.value)}
                    style={{
                      padding: "0.5rem",
                      borderRadius: "0.5rem",
                      border: "1px solid #cbd5e1",
                      background: "white",
                      width: "100%",
                      maxWidth: "200px"
                    }}
                  >
                    <option value="">Unassigned</option>
                    {mechanics.map((m) => (
                      <option key={m.$id} value={m.$id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error && <p style={{ color: "var(--error-color)", marginTop: "1rem" }}>{error}</p>}
=======
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "left" }}>
      <h2>Staff: Appointment Scheduling</h2>

      <table
        border={1}
        cellPadding={8}
        style={{ width: "100%", marginBottom: "20px" }}
      >
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer ID</th>
            <th>Vehicle</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            <th>Mechanic</th>
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
                  value={b.status}
                  onChange={(e) => handleStatusChange(b.$id!, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <select
                  value={b.mechanicId || ""}
                  onChange={(e) => handleAssignMechanic(b.$id!, e.target.value)}
                >
                  <option value="">Unassigned</option>
                  {mechanics.map((m) => (
                    <option key={m.$id} value={m.$id}>
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

export default AppointmentScheduling;
