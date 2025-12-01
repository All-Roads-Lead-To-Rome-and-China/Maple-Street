import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBooking from "../hooks/useBooking";

const CustomerBookings = () => {
  const { customerId } = useParams();
  const { getBookingsByCustomer } = useBooking();

  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookingsByCustomer(customerId!);
        setBookings(data || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to fetch bookings.");
      }
    };
    fetchBookings();
  }, [customerId, getBookingsByCustomer]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "left" }}>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table
          border={1}
          cellPadding={8}
          style={{ width: "100%", marginTop: "20px" }}
        >
          <thead>
            <tr>
              <th>Service</th>
              <th>Vehicle</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.$id}>
                <td>{b.serviceType}</td>
                <td>
                  {b.vehicleMake} {b.vehicleModel} ({b.notes})
                </td>
                <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
                <td>
                  {new Date(b.bookingDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerBookings;
