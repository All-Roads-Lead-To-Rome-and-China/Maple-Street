import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBooking from "../hooks/useBooking";

const BookingForm = ({ customerId }: { customerId: string }) => {
  const { createBooking } = useBooking();
  const navigate = useNavigate();

  const [serviceType, setServiceType] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState<number | "">("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!serviceType || !registrationNumber || !vehicleMake || !vehicleModel || !bookingDate || !bookingTime) {
      setError("All fields except vehicle year are required.");
      return;
    }

    try {
      await createBooking({
        customerId,
        vehicleMake,
        vehicleModel,
        vehicleYear: vehicleYear ? Number(vehicleYear) : new Date().getFullYear(),
        serviceType,
        bookingDate: `${bookingDate}T${bookingTime}:00`,
        notes: `Registration: ${registrationNumber}`,
        mechanicId: undefined,
      });

      // ✅ Include customerId in the success page URL
      navigate(
        `/booking-success?serviceType=${encodeURIComponent(serviceType)}&registrationNumber=${encodeURIComponent(
          registrationNumber
        )}&bookingDate=${encodeURIComponent(bookingDate)}&bookingTime=${encodeURIComponent(bookingTime)}&customerId=${encodeURIComponent(customerId)}`
      );
    } catch (err) {
      console.error("Error creating booking:", err);
      setError("Failed to create booking.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "left" }}>
      <h2>Book a Service</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <label>
          Service Required:
          <input value={serviceType} onChange={(e) => setServiceType(e.target.value)} placeholder="e.g. Oil Change" />
        </label>
        <label>
          Registration Number:
          <input value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} />
        </label>
        <label>
          Vehicle Make:
          <input value={vehicleMake} onChange={(e) => setVehicleMake(e.target.value)} />
        </label>
        <label>
          Vehicle Model:
          <input value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} />
        </label>
        <label>
          Vehicle Year:
          <input
            type="number"
            value={vehicleYear}
            onChange={(e) => setVehicleYear(e.target.value ? Number(e.target.value) : "")}
          />
        </label>
        <label>
          Date:
          <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
        </label>
        <label>
          Time:
          <input type="time" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} />
        </label>
        <button type="submit">Submit Booking</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default BookingForm;