import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import CustomerRegistrationForm from "./components/CustomerRegistrationForm";
import CustomerProfile from "./components/CustomerProfile";
import CustomerList from "./components/CustomerList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />

        {/* Customer Journey */}
        <Route path="/customer" element={<CustomerRegistrationForm />} />
        <Route path="/customer/profile" element={<CustomerProfile />} />

        {/* Staff Journey */}
        <Route path="/staff" element={<CustomerList />} />
      </Routes>
    </Router>
  );
}

export default App;