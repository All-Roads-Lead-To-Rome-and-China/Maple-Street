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

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <h2>Great News!</h2>
      <p>
        A booking has been made for a <strong>{serviceType}</strong> for the
        vehicle <strong>{registrationNumber}</strong> on{" "}
        <strong>{bookingDate}</strong> at <strong>{bookingTime}</strong>.
      </p>

      <button onClick={() => navigate("/")}>Return to Home</button>
    </div>
  );
};

export default BookingSuccess;
