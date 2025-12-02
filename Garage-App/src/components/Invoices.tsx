import { useState, useEffect } from "react";
import useBooking from "../hooks/useBooking";
import useInventory from "../hooks/useInventory";
import useStaff from "../hooks/useStaff";

interface Invoice {
  id: string;
  bookingId: string;
  customerId: string;
  mechanicId: string;
  serviceType: string;
  parts: { itemName: string; quantity: number; price: number }[];
  laborHours: number;
  totalAmount: number;
  paymentStatus: "Unpaid" | "Paid";
}

const Invoices = () => {
  const { getAllBookings } = useBooking();
  const { getAllInventory } = useInventory();
  const { getAllMechanics } = useStaff();

  const [bookings, setBookings] = useState<any[]>([]);
  const [mechanics, setMechanics] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allBookings = await getAllBookings();
        setBookings(allBookings);

        const allMechanics = await getAllMechanics();
        setMechanics(allMechanics);

        const allInventory = await getAllInventory();
        setInventory(allInventory);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data for invoices.");
      }
    };
    fetchData();
  }, [getAllBookings, getAllMechanics, getAllInventory]);

  // Generate invoice when booking is completed
  const generateInvoice = (booking: any) => {
    // Example: assume 2 labor hours per booking
    const laborHours = 2;
    const laborRate = 50; // £50/hour

    // Example: parts used (could be selected manually later)
    const partsUsed = [
      { itemName: "Oil Filter", quantity: 1, price: 20 },
      { itemName: "Engine Oil", quantity: 1, price: 35 },
    ];

    const partsTotal = partsUsed.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const laborTotal = laborHours * laborRate;
    const totalAmount = partsTotal + laborTotal;

    const invoice: Invoice = {
      id: `INV-${booking.$id}`,
      bookingId: booking.$id,
      customerId: booking.customerId,
      mechanicId: booking.mechanicId || "",
      serviceType: booking.serviceType,
      parts: partsUsed,
      laborHours,
      totalAmount,
      paymentStatus: "Unpaid",
    };

    setInvoices((prev) => [...prev, invoice]);
  };

  const markAsPaid = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId ? { ...inv, paymentStatus: "Paid" } : inv
      )
    );
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "left" }}>
      <h2>Invoices & Payments</h2>

      <h3>Completed Bookings (Generate Invoice)</h3>
      <ul>
        {bookings
          .filter((b) => b.status === "Completed")
          .map((b) => (
            <li key={b.$id}>
              {b.serviceType} for {b.vehicleMake} {b.vehicleModel} ({b.vehicleYear}) - {new Date(b.bookingDate).toLocaleString()}
              <button onClick={() => generateInvoice(b)} style={{ marginLeft: "10px" }}>
                Generate Invoice
              </button>
            </li>
          ))}
      </ul>

      <h3>Invoices</h3>
      <table border={1} cellPadding={8} style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Booking</th>
            <th>Customer</th>
            <th>Mechanic</th>
            <th>Service</th>
            <th>Parts</th>
            <th>Labor Hours</th>
            <th>Total (£)</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.bookingId}</td>
              <td>{inv.customerId}</td>
              <td>{inv.mechanicId}</td>
              <td>{inv.serviceType}</td>
              <td>
                {inv.parts.map((p, idx) => (
                  <div key={idx}>
                    {p.itemName} x{p.quantity} (£{p.price})
                  </div>
                ))}
              </td>
              <td>{inv.laborHours}</td>
              <td>{inv.totalAmount}</td>
              <td>{inv.paymentStatus}</td>
              <td>
                {inv.paymentStatus === "Unpaid" && (
                  <button onClick={() => markAsPaid(inv.id)}>Mark Paid</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Invoices;