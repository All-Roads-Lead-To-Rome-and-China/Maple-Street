import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import HomePage from "./pages/HomePage"
import CustomerPortal from "./pages/CustomerPortal";
import CustomerRegistrationForm from "./components/CustomerRegistrationForm";
import CustomerProfile from "./components/CustomerProfile";
import CustomerList from "./components/CustomerList";
import BookingForm from "./components/BookingForm";
import BookingSuccess from "./components/BookingSuccess";
import CustomerBookings from "./components/CustomerBookings";
import StaffDashboard from "./pages/StaffDashboard";
import InventoryList from "./components/InventoryList";
import AppointmentScheduling from "./components/AppointmentScheduling";
import StaffScheduling from "./components/StaffScheduling";

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
        <Route
          path="/customer/register"
          element={<CustomerRegistrationForm />}
        />
        <Route path="/customer/profile" element={<CustomerProfile />} />
        <Route
          path="/customer/:customerId/booking"
          element={<BookingFormWrapper />}
        />
        <Route
          path="/customer/:customerId/bookings"
          element={<CustomerBookingsWrapper />}
        />

        {/* Booking Success */}
        <Route path="/booking-success" element={<BookingSuccess />} />

        {/* Staff Journey */}
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/staff/customers" element={<CustomerList />} />
        <Route path="/staff/appointments" element={<AppointmentScheduling />} />
        <Route path="/staff/inventory" element={<InventoryList />} />
        <Route
          path="/staff/invoices"
          element={<div>Invoices & Payments Component</div>}
        />
        <Route path="/staff/scheduling" element={<StaffScheduling />} />
        <Route
          path="/staff/compliance"
          element={<div>Compliance & Safety Component</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;
