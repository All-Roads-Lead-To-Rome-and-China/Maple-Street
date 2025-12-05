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
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.875rem 1rem",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--border-color-strong)",
    background: "white",
    fontSize: "1rem",
    transition: "all 0.2s",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "var(--text-primary)",
  };

  return (
    <div
      className="page-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        paddingTop: "4rem",
        background: "linear-gradient(180deg, #fbfbfd 0%, #f5f5f7 100%)",
      }}
    >
      <div style={{
        width: "100%",
        maxWidth: "640px",
        background: "white",
        borderRadius: "var(--radius-2xl)",
        padding: "2.5rem",
        border: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-lg)",
      }}>

        {/* Header & Progress */}
        <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
          <h2 style={{
            color: "var(--text-primary)",
            marginBottom: "2rem",
            fontSize: "1.75rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}>
            Book a Service
          </h2>

          {/* Progress Steps */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0" }}>
            {steps.map((step, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "50%",
                      background: index <= currentStep
                        ? "linear-gradient(135deg, var(--primary-color) 0%, #40a9ff 100%)"
                        : "#f5f5f7",
                      color: index <= currentStep ? "white" : "var(--text-tertiary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      transition: "all 0.3s ease",
                      boxShadow: index <= currentStep ? "0 4px 12px rgba(0, 113, 227, 0.3)" : "none",
                    }}
                  >
                    {index < currentStep ? "✓" : index + 1}
                  </div>
                  <span style={{
                    fontSize: "0.75rem",
                    color: index <= currentStep ? "var(--primary-color)" : "var(--text-tertiary)",
                    marginTop: "0.5rem",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}>
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div style={{
                    width: "3rem",
                    height: "2px",
                    background: index < currentStep
                      ? "linear-gradient(90deg, var(--primary-color) 0%, #40a9ff 100%)"
                      : "#e5e5e5",
                    margin: "0 0.5rem",
                    marginBottom: "1.5rem",
                    borderRadius: "1px",
                    transition: "background 0.3s ease",
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div style={{ minHeight: "280px" }}>

          {/* Step 0: Vehicle Details */}
          {currentStep === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label htmlFor="registrationNumber" style={labelStyle}>Registration Number *</label>
                <input
                  id="registrationNumber"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  placeholder="e.g. ABC-123"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--primary-color)";
                    e.target.style.boxShadow = "0 0 0 3px var(--primary-light)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--border-color-strong)";
                    e.target.style.boxShadow = "none";
                  }}
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
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--primary-color)";
                      e.target.style.boxShadow = "0 0 0 3px var(--primary-light)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--border-color-strong)";
                      e.target.style.boxShadow = "none";
                    }}
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
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--primary-color)";
                      e.target.style.boxShadow = "0 0 0 3px var(--primary-light)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--border-color-strong)";
                      e.target.style.boxShadow = "none";
                    }}
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
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--primary-color)";
                    e.target.style.boxShadow = "0 0 0 3px var(--primary-light)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--border-color-strong)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>
          )}

          {/* Step 1: Service Type */}
          {currentStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <label style={labelStyle}>Select Service Required *</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {["Oil Change", "Brake Inspection", "Tire Rotation", "Full Service", "Diagnostic", "MOT"].map((type) => (
                  <div
                    key={type}
                    onClick={() => setServiceType(type)}
                    style={{
                      padding: "1.25rem",
                      border: serviceType === type ? "2px solid var(--primary-color)" : "1px solid var(--border-color-strong)",
                      borderRadius: "var(--radius-lg)",
                      background: serviceType === type ? "var(--primary-light)" : "white",
                      cursor: "pointer",
                      textAlign: "center",
                      fontWeight: serviceType === type ? 600 : 400,
                      color: serviceType === type ? "var(--primary-color)" : "var(--text-primary)",
                      transition: "all 0.2s ease",
                      transform: serviceType === type ? "scale(1.02)" : "scale(1)",
                    }}
                    onMouseEnter={(e) => {
                      if (serviceType !== type) {
                        e.currentTarget.style.borderColor = "var(--primary-color)";
                        e.currentTarget.style.background = "#fafafa";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (serviceType !== type) {
                        e.currentTarget.style.borderColor = "var(--border-color-strong)";
                        e.currentTarget.style.background = "white";
                      }
                    }}
                  >
                    {type}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "0.5rem" }}>
                <label htmlFor="customService" style={labelStyle}>Or enter custom service:</label>
                <input
                  id="customService"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  placeholder="Describe issue..."
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--primary-color)";
                    e.target.style.boxShadow = "0 0 0 3px var(--primary-light)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--border-color-strong)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {currentStep === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label htmlFor="bookingDate" style={labelStyle}>Preferred Date *</label>
                <input
                  id="bookingDate"
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  style={inputStyle}
                  min={new Date().toISOString().split("T")[0]}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--primary-color)";
                    e.target.style.boxShadow = "0 0 0 3px var(--primary-light)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--border-color-strong)";
                    e.target.style.boxShadow = "none";
                  }}
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
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--primary-color)";
                    e.target.style.boxShadow = "0 0 0 3px var(--primary-light)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--border-color-strong)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              <div style={{
                padding: "1rem 1.25rem",
                background: "var(--primary-light)",
                borderRadius: "var(--radius-md)",
                fontSize: "0.9375rem",
                color: "var(--primary-color)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}>
                <span>ℹ️</span>
                <span>This is a requested time. We will confirm the actual appointment time shortly.</span>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {currentStep === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <h3 style={{
                fontSize: "1.125rem",
                marginBottom: "0.5rem",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}>
                Please confirm your details
              </h3>
              <div style={{
                background: "#fafafa",
                padding: "1.5rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-color)"
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-tertiary)", marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Vehicle</span>
                    <strong style={{ display: "block", color: "var(--text-primary)", fontSize: "1rem" }}>{vehicleYear} {vehicleMake} {vehicleModel}</strong>
                    <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>({registrationNumber})</span>
                  </div>
                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-tertiary)", marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Service</span>
                    <strong style={{ display: "block", color: "var(--primary-color)", fontSize: "1rem" }}>{serviceType}</strong>
                  </div>
                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-tertiary)", marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</span>
                    <strong style={{ color: "var(--text-primary)", fontSize: "1rem" }}>{bookingDate}</strong>
                  </div>
                  <div>
                    <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-tertiary)", marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Time</span>
                    <strong style={{ color: "var(--text-primary)", fontSize: "1rem" }}>{bookingTime}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            marginTop: "1.5rem",
            padding: "0.875rem 1rem",
            background: "rgba(255, 59, 48, 0.08)",
            border: "1px solid rgba(255, 59, 48, 0.2)",
            borderRadius: "var(--radius-md)",
            color: "var(--error-color)",
            textAlign: "center",
            fontSize: "0.9375rem",
          }}>
            {error}
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", gap: "1rem" }}>
          {currentStep > 0 ? (
            <button
              className="btn btn-secondary"
              onClick={handleBack}
              disabled={isSubmitting}
              style={{ flex: 1, padding: "1rem" }}
            >
              Back
            </button>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={() => navigate(`/customer/profile`)}
              disabled={isSubmitting}
              style={{ flex: 1, padding: "1rem" }}
            >
              Cancel
            </button>
          )}

          {currentStep < steps.length - 1 ? (
            <button
              className="btn btn-primary"
              onClick={handleNext}
              style={{ flex: 1, padding: "1rem" }}
            >
              Next Step
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                flex: 1,
                padding: "1rem",
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? "Booking..." : "Confirm Booking"}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default BookingForm;