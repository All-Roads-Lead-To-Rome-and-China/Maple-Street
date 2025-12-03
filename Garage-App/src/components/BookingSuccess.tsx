import { useLocation, useNavigate } from "react-router-dom";

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query parameters
  const params = new URLSearchParams(location.search);
  const serviceType = params.get("serviceType");
  const registrationNumber = params.get("registrationNumber");
  const bookingDate = params.get("bookingDate");
  const bookingTime = params.get("bookingTime");
  const customerId = params.get("customerId");

  return (
    <div className="page-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
      <div className="glass-panel" style={{ width: "100%", maxWidth: "600px", padding: "3rem", textAlign: "center" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>🎉</div>

        <h2 style={{ color: "var(--success-color)", marginBottom: "1rem", fontSize: "2rem" }}>Great News!</h2>

        <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "2rem", lineHeight: "1.6" }}>
          Your booking has been successfully confirmed.
        </p>

        <div style={{ background: "rgba(255, 255, 255, 0.6)", borderRadius: "1rem", padding: "1.5rem", marginBottom: "2rem", textAlign: "left" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <span style={{ display: "block", fontSize: "0.85rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Service</span>
              <strong style={{ fontSize: "1.1rem", color: "var(--primary-color)" }}>{serviceType}</strong>
            </div>
            <div>
              <span style={{ display: "block", fontSize: "0.85rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Vehicle</span>
              <strong style={{ fontSize: "1.1rem" }}>{registrationNumber}</strong>
            </div>
            <div>
              <span style={{ display: "block", fontSize: "0.85rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</span>
              <strong style={{ fontSize: "1.1rem" }}>{bookingDate}</strong>
            </div>
            <div>
              <span style={{ display: "block", fontSize: "0.85rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Time</span>
              <strong style={{ fontSize: "1.1rem" }}>{bookingTime}</strong>
            </div>
          </div>
        </div>

        <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginBottom: "2rem" }}>
          You will receive an email confirmation shortly. We look forward to seeing you soon!
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {customerId && (
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/customer/${customerId}/bookings`)}
              style={{ width: "100%" }}
            >
              View My Bookings
            </button>
          )}
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/")}
            style={{ width: "100%" }}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
