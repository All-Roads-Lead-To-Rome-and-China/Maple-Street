import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useCustomerInteraction from "./hooks/useCustomerInteraction";

function App() {
  const [count, setCount] = useState(0);
  const { addCustomerToDatabase } = useCustomerInteraction();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        customerId: "test-id-" + Math.random().toString(36).substr(2, 9),
        firstName,
        lastName,
        email,
        phone: phone || undefined,
        isActive,
      };

      await addCustomerToDatabase(dataToSend);
      alert("Customer added successfully!");

      // Reset fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setIsActive(true);
    } catch (error) {
      console.error("Failed to add customer:", error);
      alert("Failed to add customer. See console for details.");
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <div
        className="card"
        style={{ textAlign: "left", maxWidth: "400px", margin: "0 auto" }}
      >
        <h2>Test Add Customer</h2>
        {/* Using div instead of form to avoid default browser submit behavior */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <label>First Name: </label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
          </div>
          <div>
            <label>Last Name: </label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </div>
          <div>
            <label>Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div>
            <label>Phone: </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
            />
          </div>
          <div>
            <label>Active: </label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </div>
          <button type="button" onClick={handleSubmit}>
            Add Customer
          </button>
        </div>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
