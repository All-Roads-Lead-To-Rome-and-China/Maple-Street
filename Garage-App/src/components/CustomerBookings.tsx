import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useBooking from "../hooks/useBooking";
import type { BookingData } from "../contexts/BookingContext";

const CustomerBookings = () => {
  const { customerId } = useParams();
  const { getBookingsByCustomer } = useBooking();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookingsByCustomer(customerId!);
        // Sort by date descending (newest first)
        const sorted = (data || []).sort(
          (a: BookingData, b: BookingData) =>
            new Date(b.bookingDate).getTime() -
            new Date(a.bookingDate).getTime()
        );
        setBookings(sorted);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [customerId, getBookingsByCustomer]);

  const getStatusBadge = (status: string) => {
    // Fallback styles using inline CSS for simplicity if Tailwind isn't fully set up

    // Fallback styles using inline CSS for simplicity if Tailwind isn't fully set up
    const inlineStyles: Record<string, { bg: string; color: string }> = {
      Pending: { bg: "#fef9c3", color: "#854d0e" },
      Confirmed: { bg: "#dbeafe", color: "#1e40af" },
      "In Progress": { bg: "#f3e8ff", color: "#6b21a8" },
      Completed: { bg: "#dcfce7", color: "#166534" },
      Cancelled: { bg: "#fee2e2", color: "#991b1b" },
    };

    const style = inlineStyles[status] || { bg: "#f1f5f9", color: "#475569" };

    return (
      <span
        style={{
          backgroundColor: style.bg,
          color: style.color,
          padding: "0.25rem 0.75rem",
          borderRadius: "9999px",
          fontSize: "0.75rem",
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <div
      className="page-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "80vh",
        paddingTop: "2rem",
      }}
    >
      <div
        className="glass-panel"
        style={{ width: "100%", maxWidth: "800px", padding: "2rem" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ color: "var(--primary-color)", margin: 0 }}>
            My Bookings
          </h2>
          <button
            onClick={() => navigate("/customer/profile")}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            ← Back to Profile
          </button>
        </div>

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "2rem",
              color: "var(--text-secondary)",
            }}
          >
            Loading bookings...
          </div>
        ) : error ? (
          <div
            style={{
              padding: "1rem",
              background: "rgba(239, 68, 68, 0.1)",
              borderRadius: "0.5rem",
              color: "var(--error-color)",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        ) : bookings.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📅</div>
            <h3
              style={{ color: "var(--text-primary)", marginBottom: "0.5rem" }}
            >
              No bookings found
            </h3>
            <p
              style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}
            >
              You haven't booked any services yet.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/customer/${customerId}/booking`)}
            >
              Book a Service
            </button>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "1rem",
                      color: "var(--text-secondary)",
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Service
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "1rem",
                      color: "var(--text-secondary)",
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Vehicle
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "1rem",
                      color: "var(--text-secondary)",
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Date & Time
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "1rem",
                      color: "var(--text-secondary)",
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr
                    key={b.$id}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      transition: "background 0.2s",
                    }}
                    className="hover:bg-slate-50"
                  >
                    <td
                      style={{
                        padding: "1rem",
                        fontWeight: "600",
                        color: "var(--primary-color)",
                      }}
                    >
                      {b.serviceType}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ fontWeight: "500" }}>
                        {b.vehicleYear} {b.vehicleMake} {b.vehicleModel}
                      </div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {b.notes}
                      </div>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ fontWeight: "500" }}>
                        {new Date(b.bookingDate).toLocaleDateString(undefined, {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {new Date(b.bookingDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      {getStatusBadge(b.status || "Pending")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerBookings;
