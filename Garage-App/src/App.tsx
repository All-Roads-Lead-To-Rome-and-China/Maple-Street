import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import HomePage from "./pages/Homepage"
import CustomerPortal from "./pages/CustomerPortal";
import CustomerRegistrationForm from "./components/CustomerRegistrationForm";
import CustomerProfile from "./components/CustomerProfile";
import CustomerList from "./components/CustomerList";
import BookingForm from "./components/BookingForm";
import BookingSuccess from "./components/BookingSuccess";
import CustomerBookings from "./components/CustomerBookings";

// Wrapper to extract customerId from URL and pass to BookingForm
const BookingFormWrapper = () => {
  const { customerId } = useParams();
  return <BookingForm customerId={customerId!} />;
};

// Wrapper to extract customerId from URL and pass to CustomerBookings
const CustomerBookingsWrapper = () => {
  const { customerId } = useParams();
  return <CustomerBookings key={customerId} />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Customer Journey */}
        <Route path="/customer" element={<CustomerPortal />} />
        <Route path="/customer/register" element={<CustomerRegistrationForm />} />
        <Route path="/customer/profile" element={<CustomerProfile />} />
        <Route path="/customer/:customerId/booking" element={<BookingFormWrapper />} />
        <Route path="/customer/:customerId/bookings" element={<CustomerBookingsWrapper />} />

        {/* Booking Success */}
        <Route path="/booking-success" element={<BookingSuccess />} />

        {/* Staff Journey */}
        <Route path="/staff" element={<CustomerList />} />
      </Routes>
    </Router>
  );
}

export default App;