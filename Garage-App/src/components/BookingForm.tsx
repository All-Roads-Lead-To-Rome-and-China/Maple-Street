import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBooking from "../hooks/useBooking";

const BookingForm = ({ customerId }: { customerId: string }) => {
  const { createBooking } = useBooking();
  const navigate = useNavigate();

  // Steps: 0 = Vehicle, 1 = Service, 2 = Date/Time, 3 = Confirm
  const [currentStep, setCurrentStep] = useState(0);

  const [serviceType, setServiceType] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState<number | "">("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = ["Vehicle Details", "Service Type", "Date & Time", "Confirm"];

  const handleNext = () => {
    setError(null);
    // Validation per step
    if (currentStep === 0) {
      if (!registrationNumber || !vehicleMake || !vehicleModel) {
        setError("Please fill in all vehicle details.");
        return;
      }
    } else if (currentStep === 1) {
      if (!serviceType) {
        setError("Please select a service type.");
        return;
      }
    } else if (currentStep === 2) {
      if (!bookingDate || !bookingTime) {
        setError("Please select a date and time.");
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError(null);
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setError(null);
    setIsSubmitting(true);

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

      navigate(
        `/booking-success?serviceType=${encodeURIComponent(serviceType)}&registrationNumber=${encodeURIComponent(
          registrationNumber
        )}&bookingDate=${encodeURIComponent(bookingDate)}&bookingTime=${encodeURIComponent(bookingTime)}&customerId=${encodeURIComponent(customerId)}`
      );
    } catch (err) {
      console.error("Error creating booking:", err);
      setError("Failed to create booking. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Common Input Style
  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #cbd5e1",
    background: "rgba(255,255,255,0.8)",
    fontSize: "1rem",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "var(--text-primary)",
  };

  return (
    <div className="page-container" style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "80vh", paddingTop: "2rem" }}>
      <div className="glass-panel" style={{ width: "100%", maxWidth: "600px", padding: "2rem" }}>

        {/* Header & Progress */}
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <h2 style={{ color: "var(--primary-color)", marginBottom: "1rem" }}>Book a Service</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
            {steps.map((_step, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    background: index <= currentStep ? "var(--primary-color)" : "#e2e8f0",
                    color: index <= currentStep ? "white" : "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                  }}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div style={{ width: "2rem", height: "2px", background: index < currentStep ? "var(--primary-color)" : "#e2e8f0", margin: "0 0.25rem" }} />
                )}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            {steps[currentStep]}
          </div>
        </div>

        {/* Form Content */}
        <div className="fade-in" style={{ minHeight: "300px" }}>

          {/* Step 0: Vehicle Details */}
          {currentStep === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label htmlFor="registrationNumber" style={labelStyle}>Registration Number *</label>
                <input
                  id="registrationNumber"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  placeholder="e.g. ABC-123"
                  style={inputStyle}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label htmlFor="vehicleMake" style={labelStyle}>Vehicle Make *</label>
                  <input
                    id="vehicleMake"
                    value={vehicleMake}
                    onChange={(e) => setVehicleMake(e.target.value)}
                    placeholder="e.g. Toyota"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="vehicleModel" style={labelStyle}>Vehicle Model *</label>
                  <input
                    id="vehicleModel"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    placeholder="e.g. Corolla"
                    style={inputStyle}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="vehicleYear" style={labelStyle}>Vehicle Year</label>
                <input
                  id="vehicleYear"
                  type="number"
                  value={vehicleYear}
                  onChange={(e) => setVehicleYear(e.target.value ? Number(e.target.value) : "")}
                  placeholder="e.g. 2020"
                  style={inputStyle}
                />
              </div>
            </div>
          )}

          {/* Step 1: Service Type */}
          {currentStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <label style={labelStyle}>Select Service Required *</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {["Oil Change", "Brake Inspection", "Tire Rotation", "Full Service", "Diagnostic", "MOT"].map((type) => (
                  <div
                    key={type}
                    onClick={() => setServiceType(type)}
                    style={{
                      padding: "1rem",
                      border: serviceType === type ? "2px solid var(--primary-color)" : "1px solid #cbd5e1",
                      borderRadius: "0.5rem",
                      background: serviceType === type ? "rgba(37, 99, 235, 0.05)" : "white",
                      cursor: "pointer",
                      textAlign: "center",
                      fontWeight: serviceType === type ? "600" : "400",
                      color: serviceType === type ? "var(--primary-color)" : "var(--text-primary)",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {type}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "1rem" }}>
                <label htmlFor="customService" style={labelStyle}>Or enter custom service:</label>
                <input
                  id="customService"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  placeholder="Describe issue..."
                  style={inputStyle}
                />
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {currentStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label htmlFor="bookingDate" style={labelStyle}>Preferred Date *</label>
                <input
                  id="bookingDate"
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  style={inputStyle}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <label htmlFor="bookingTime" style={labelStyle}>Preferred Time *</label>
                <input
                  id="bookingTime"
                  type="time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div style={{ padding: "1rem", background: "rgba(37, 99, 235, 0.1)", borderRadius: "0.5rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                ℹ️ Note: This is a requested time. We will confirm the actual appointment time shortly.
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {currentStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Please confirm your details:</h3>
              <div style={{ background: "white", padding: "1.5rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <span style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)" }}>Vehicle</span>
                    <strong style={{ display: "block" }}>{vehicleYear} {vehicleMake} {vehicleModel}</strong>
                    <span style={{ fontSize: "0.9rem" }}>({registrationNumber})</span>
                  </div>
                  <div>
                    <span style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)" }}>Service</span>
                    <strong style={{ display: "block", color: "var(--primary-color)" }}>{serviceType}</strong>
                  </div>
                  <div>
                    <span style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)" }}>Date</span>
                    <strong>{bookingDate}</strong>
                  </div>
                  <div>
                    <span style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)" }}>Time</span>
                    <strong>{bookingTime}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Error Message */}
        {error && (
          <div style={{ marginTop: "1rem", padding: "0.75rem", background: "rgba(239, 68, 68, 0.1)", border: "1px solid var(--error-color)", borderRadius: "0.5rem", color: "var(--error-color)", textAlign: "center" }}>
            {error}
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
          {currentStep > 0 ? (
            <button className="btn btn-secondary" onClick={handleBack} disabled={isSubmitting}>
              Back
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={() => navigate(`/customer/profile`)} disabled={isSubmitting}>
              Cancel
            </button>
          )}

          {currentStep < steps.length - 1 ? (
            <button className="btn btn-primary" onClick={handleNext}>
              Next Step
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Booking..." : "Confirm Booking"}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default BookingForm;